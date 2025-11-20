import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import Footer from "./components/footer";
import Header from "./components/header";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { use } from "react";

function CheckoutPage() {
  const { id } = useParams();
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(null); 
  
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken'); 
    
    if (token) {
      setAccessToken(token);
    }
  }, []);



  const handleCheckout = async () => {
    if(cartTotal === 0){
      alert("Tidak ada item yang dipilih untuk checkout.");
    }else{
      const orderData = {
        items: cartItems.filter(item => selectedItems[item.id]),
        subtotal: cartTotal
      }
      sessionStorage.setItem('orderData', JSON.stringify(orderData));
      navigate(`/order-form`);
    }
  }

  


  const handleCheckboxChange = (itemId, isChecked) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: isChecked,
    }));
  };

  const calculateTotal = (items, selected) => {
    let total = 0;
    items.forEach((item) => {
      if (selected[item.id] && item.Product && item.Product.productPrice) {
        total += item.quantity * item.Product.productPrice;
      }
    });
    return total;
  };


  useEffect(() => {
    const userToken = sessionStorage.getItem("accessToken");

    if (!userToken) {
      setError("Harap login untuk melihat keranjang Anda.");
      setLoading(false);
      return;
    }

    function decodeJWT(token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
      } catch (e) {
        return null;
      }
    }

    const fetchCartDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Memasuki data cart")
        const payload = decodeJWT(userToken);
        const userId = payload ? payload.id : null;
        if(!userId){
          setError("Token tidak valid atau id pengguna tidak ditemukan.");
          setLoading(false);
          return;
        }

        console.log("User ID untuk cart:", userId);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/show-cart/${userId}`, {
          method: "GET",
          headers: { accessToken: userToken },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Gagal mengambil data keranjang.`);
        }

        const data = await response.json();
        console.log("Data cart diterima:", data);
        const fetchedCartItems = data.CartItems || [];

        const initialSelected = {};
        fetchedCartItems.forEach((item) => {
          initialSelected[item.id] = true;
        });

        setCartItems(fetchedCartItems);
        setSelectedItems(initialSelected);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product detail:", err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetail();
  }, [id]);

  useEffect(() => {
    const newTotal = calculateTotal(cartItems, selectedItems);
    setCartTotal(newTotal);
  }, [cartItems, selectedItems]);

  if (loading) return <div className="text-center pt-32">Memuat keranjang...</div>;
  if (error) return <div className="text-center pt-32 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col w-screen min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat font-montserrat">
      <Header />
      <div className="">
        <p className="mt-30 text-2xl font-bold underline underline-offset-1">
          Checkout
        </p>
        <div className="flex flex-row ml-[20px]">
          {/* BAGIAN KIRI */}
          <div className="flex flex-col">
            {cartItems.length === 0 ? (
              <p className="mt-5 text-xl">Keranjang Anda kosong.</p>
            ) : (
              cartItems.map(
                (item) =>
                  item.Product && (
                    <div
                      key={item.id}
                      className="flex flex-row w-[464px] h-[154px] mt-5 items-center justify-between"
                    >
                      <Checkbox
                        className="!bg-white !text-black w-8 h-8 aspect-square shrink-0"
                        checked={selectedItems[item.id] || false}
                        onCheckedChange={(isChecked) =>
                          handleCheckboxChange(item.id, isChecked)
                        }
                        />
                        {/* console.log(`Checkbox ${isChecked ? "checked" : "unchecked"} for item ID: ${item.id}`) */}
                      <div className="w-[399px] bg-[#D9D9D9] flex p-5 items-center rounded-[12px]">
                        <img
                          src={`${item.Product.productImg}`}
                          alt={item.Product.productName}
                          width="100px"
                        />
                        <div className="pl-4 text-start">
                          <h2 className="font-bold">
                            {item.Product.productName}
                          </h2>
                          <h3>Quantity : {item.quantity}</h3>
                          <h3>Price : {item.Product.productPrice}</h3>
                        </div>
                      </div>
                    </div>
                  )
              )
            )}
          </div>

          {/* KANAN: RINCIAN */}
          <div className="flex flex-col items-end">
            <div className="flex flex-col w-[680px] h-[322px] ml-[25px] mt-5 p-5 rounded-[12px] bg-[#D9D9D9]">
              <p className="font-bold text-xl text-start">Order Summary</p>
              <div className="w-[600px] mt-[10px] mx-auto">
                <Table className="rounded-[12px] bg-transparent items-start">
                  <TableHeader className="border-b-2 border-solid border-black">
                    <TableRow>
                      <TableHead className="text-left pl-[30px] w-[40%]">Nama produk</TableHead>
                      <TableHead className="text-center w-[15%]">Qty.</TableHead>
                      <TableHead className="text-right pr-[90px] w-[45%]">Harga</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems
                      .filter((item) => selectedItems[item.id] && item.Product)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="text-left pl-[30px] w-[40%]">{item.Product.productName}</TableCell>
                          <TableCell className="text-center w-[15%]">{item.quantity}</TableCell>
                          <TableCell className="text-right pr-[90px]">{item.Product.productPrice}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex flex-col mt-5 ml-auto mr-15 items-end">
                <div className="flex flex-row w-[150px] justify-between">
                  <p className="font-bold">Subtotal</p>
                  <p className="font-bold">Rp {cartTotal}</p>
                </div>
              </div>
            </div>

            {/* ✅ Tombol Checkout */}
            <Button
              className="!bg-red-500 w-[173px] h-[50px] mt-[38px] mr-[25px] !font-bold"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckoutPage;
