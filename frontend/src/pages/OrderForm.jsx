import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from "./components/header"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {Formik, Form, Field, ErrorMessage} from "formik";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import axios from "axios";
import { useEffect, useState } from "react";

function OrderForm() {
  const shippingPrice = 10000;
  const assurancePrice = 10000;
  const [accessToken, setAccessToken] = useState("");
  const [items, setItems] = useState([]);
  const [subTotal, setSubtotal] = useState(0);
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const grandTotal = subTotal + shippingPrice + assurancePrice;

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    
    if (token) {
      setAccessToken(token);
      // fetchUserData(token);
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

    const fetchOrderData = async () => {
    try {
      const orderData = sessionStorage.getItem('orderData');
      if (!orderData) {
        console.log('No order data found in session storage');
      }
      const parsedOrderData = JSON.parse(orderData);
      console.log("ini adalah orderData:", parsedOrderData.items[0].id);
      setItems(parsedOrderData.items);
      setSubtotal(parsedOrderData.subtotal || 0);
      console.log("ini adalah items:", items);
    } catch (error) {
      console.log("ini adalah orderData:", await orderData.json());
      console.error("Error fetching order data:", error);
      return null;
    }
  };

    const fetchUserData = async () => {
      try {
        const payload = decodeJWT(token);
        if (!payload || !payload.id) {
          throw new Error('Invalid token payload');
        }
        const response = await fetch(`http://localhost:3001/api/${payload.id}`,{
          method: 'GET',
          headers: {accessToken: token}
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch user data`);
        }
        const userData = await response.json();
        setReceiverName(userData.name);
        setReceiverAddress(userData.address);
        setPhoneNumber(userData.phoneNum);
        fetchOrderData();
      } catch (error) {
        console.log({error: error.message})
      }
    }

    fetchUserData();
  }, []);

  // Midtrans
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // handle delete cart
    const handleDeleteCart = async (token) => {
    try {
      if (!token) {
        alert("Token tidak ditemukan, silakan login ulang!");
        return;
      }

      const response = await fetch(`http://localhost:3001/api/cart/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "accessToken": token,
        }
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Semua item di keranjang berhasil dihapus!");
        return true;
      } else {
        alert("Gagal menghapus keranjang: " + data.error);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }

  // add to order function
  const Submit = async (values) => {
    try {
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

      const userToken = sessionStorage.getItem('accessToken');
      const payload = decodeJWT(userToken);
      
      const listItems = [];
      for(const i of items){
        console.log("ini adalah i: ",i)
        listItems.push({
          productId: i.id,
          quantity: i.quantity
        })
      }

      // Ini kirim initial data ke database order
      const res = await fetch('http://localhost:3001/api/admin/order/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accessToken': userToken,
        },body: JSON.stringify({
          userId: payload.id,
          receiverName: values.receiverName,
          address: values.address,
          phoneNum: values.phoneNum,
          items: listItems,
          grandTotal: values.grandTotal
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error response from server:", errorData);
        throw new Error(errorData.message || 'Failed to create order');
      }

      const orderData = await res.json();
      console.log("Order created successfully:", orderData);

      // Ini mulai midtrans
      const response = await fetch('http://localhost:3001/api/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderData.orderID,
          name: values.receiverName,
          email: values.email,
          amount: values.grandTotal,
        })
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (!window.snap) {
        alert("Snap.js belum dimuat. Pastikan script Midtrans ada di index.html");
        return;
      }

      window.snap.pay(data.token, {
      onSuccess: async function (result) {
        console.log("Payment success:", result);

        const updateCart = await fetch('http://localhost:3001/api/admin/order/updateOrder', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',},
          body: JSON.stringify({
            orderID: orderData.orderId,
            targetStatus: "Payment",
            status: "Paid"
          })
        });
        const updateData = await updateCart.json();
        // const deleteSuccess = await handleDeleteCart(userToken);
        // if (deleteSuccess) {
        //   alert("Pembayaran berhasil dan keranjang dikosongkan.");
        //   navigate('/');
        // }else{
          // alert("Pembayaran berhasil tetapi gagal mengosongkan keranjang. Silahkan hubungi admin.");
        //   navigate('/');
        // }
      },
      onPending: function (result) {
        console.log("Payment pending:", result);
        alert("Menunggu pembayaran...");
      },
      onError: function (result) {
        console.log("Payment error:", result);
        alert("Terjadi kesalahan pada pembayaran!");
      },
      onClose: function () {
        alert("Popup ditutup tanpa menyelesaikan pembayaran");
      },
      });

    } catch (error) {
      console.log({message: "Ini errornya", error: error.message})
    }
  }

  const validationSchema = Yup.object().shape({
    receiverName: Yup.string().required(),
    address: Yup.string().required(),
    phoneNum: Yup.string().required(),
    shippingPrice: Yup.number(),
    assurancePrice: Yup.number(),
    grandTotal: Yup.number(),
  })
  
  

  return (
    <div className="flex flex-col w-screen min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat">
      <div className="flex flex-1 flex-col items-center mt-[12px] mx-5">
        <img src="/logo/logoNoBg.png" alt="" width="210px"/>
        <p className="font-bold underline underline-solid text-xl mt-[2px] mb-[30px]">Order Confirmation</p>
          {/* Identitas */}
          <Formik 
            enableReinitialize 
            initialValues={{
            receiverName: receiverName ? receiverName : "",
            address: receiverAddress,
            phoneNum: phoneNumber,
            shippingPrice: shippingPrice,
            assurancePrice: assurancePrice,
            grandTotal: grandTotal ? grandTotal : 0,
            }} onSubmit={Submit} validationSchema={validationSchema}>
            <Form className="flex flex-row">
              <div className="bg-[#F1DFE4] flex flex-col w-[500px] h-[351px] px-[50px] justify-center shadow-xl/30">
                <div className="flex flex-row mb-[16px]">
                  <img src="/logo/mdi_location.png" alt="" width="24px"/>
                  <p className="font-bold ml-[9px]">Identity</p>
                </div>
                <div className="text-start mb-[13px]">
                  <label>Receiver Name</label>
                  <Field autocomplete="off" id="receiverName" name="receiverName" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"/>
                  <ErrorMessage name="receiverName" component="span"/>
                </div>
                <div className="text-start mb-[13px]">
                  <label className="mt-[10px]">Shipping Address</label>
                  <Field autocomplete="off" id="address" name="address" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"/>
                  <ErrorMessage name="address" component="span"/>
                </div>
                <div className="text-start mb-[13px]">
                  <label className="mt-[10px]">Phone Number</label>
                  <Field autocomplete="off" id="phoneNum" name="phoneNum" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"/>
                  <ErrorMessage name="phoneNum" component="span"/>
                </div>
              </div>
              {/* Ringkasan Pesanan */}
              <div className="flex flex-col ml-[32px] shadow-xl/30 items-end">
                <div className="bg-[#F1DFE4] flex flex-col w-[550px] pt-[30px] pb-[30px] h-[440px] justify-center">
                  <div className="flex flex-row mx-[50px] mb-[16px] ">
                    <img src="/logo/lsicon_order-filled.png" alt="" width="24px" />
                    <p className="font-bold ml-[9px]">Order Summary</p>
                  </div>
                  <div className="w-[450px] mx-auto overflow-y-auto">
                    <Table>
                      <TableHeader className="border-b-2 border-solid border-gray-700">
                        <TableRow>
                          <TableHead className="text-left pl-[20px] w-[40%]">Product Name</TableHead>
                          <TableHead className="text-center w-[20%]">Qty.</TableHead>
                          <TableHead className="text-center px-auto w-[40%]">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.id} className="m-0 p-0">
                            <TableCell className="text-left pl-[20px] w-[40%]">{item.Product.productName}</TableCell>
                            <TableCell className="text-center w-[20%]">{item.quantity}</TableCell>
                            <TableCell className="text-center px-auto w-[40%]">{subTotal}</TableCell>
                        </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex flex-row justify-between mt-[10px] mb-[16px] px-[50px]">
                    <label className="mt-[10px]">Shipping Cost :</label>
                    <Field autocomplete="off" id="shippingPrice" name="shippingPrice" value={shippingPrice} className="w-[250px] h-[30px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] px-[12px] outline-none text-end" readOnly/>
                    <ErrorMessage name="shippingPrice" component="span"/>
                  </div>
                  <div className="flex flex-row justify-between mb-[16px] px-[50px]">
                    <label className="mt-[10px]">Assurance Cost :</label>
                    <Field autocomplete="off" name="assurancePrice" id="assurancePrice" value={assurancePrice} className="w-[250px] h-[30px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] px-[12px] outline-none text-end" readOnly/>
                    <ErrorMessage name="assurancePrice" component="span"/>
                  </div>

                  <div className="flex flex-row justify-between mb-[16px] px-[50px]">
                    <label className="mt-[10px] font-bold">Grand Total :</label>
                    <Field autocomplete="off" name="grandTotal" id="grandTotal" className="w-[250px] h-[30px] bg-[#D9D9D9] font-bold shadow-xl/20 rounded-[12px] px-[12px] outline-none text-end" readOnly/>
                    <ErrorMessage name="grandTotal" component="span"/>
                  </div>
                  <Button type="submit" className="ml-auto mr-[51px] !bg-[#F4476D] mt-[5px] h-[47px] !shadow-xl/20 outline-none hover:!bg-[#CF2248] hover:shadow-xl/30 ">Create Order</Button>
                </div>
              </div>
            </Form>
          </Formik>
      </div>
    </div>
  )
}

export default OrderForm;
