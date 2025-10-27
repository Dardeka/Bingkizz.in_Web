import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import Footer from "./components/footer"
import Header from "./components/header"
import { useParams } from 'react-router-dom'
import React, { useState, useEffect, use } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function CheckoutPage(){
    const { id } = useParams();
    const [cartTotal, setCartTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const shippingPrice = 10000;
    const assurancePrice = 10000;
    const grandTotal = cartTotal + shippingPrice + assurancePrice;

    // Handle checkbox change
    const handleCheckboxChange = (itemId, isChecked) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemId]: isChecked,
        }));
    };

    const calculateTotal = (items, selected) => {
        let total = 0;
        items.forEach(item => {
            if (selected[item.id] && item.Product && item.Product.productPrice) {
                total += item.quantity * item.Product.productPrice;
            }
        });
        return total;
    };

    useEffect(() => {
        if (!id) return;

        const userToken = sessionStorage.getItem('accessToken');

        if (!userToken) {
            // Jika tidak ada token, set error dan berhenti
            setError("Harap login untuk melihat keranjang Anda.");
            setLoading(false);
            return;
        }

        const fetchCartDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                // Ganti URL ini dengan endpoint API Anda untuk mengambil detail produk
                const response = await fetch(`http://localhost:3001/cart/${id}`, {
                    method: 'GET',
                    headers: {
                        'accessToken': userToken
                    }
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Gagal mengambil data keranjang.`);
                }
                
                const data = await response.json();
                console.log('the data is',data);
                const fetchedCartItems = data.CartItems || [];
                
                // Asumsi data yang di-return dari backend sudah berbentuk detail produk
                const initialSelected = {};
                fetchedCartItems.forEach(item => {
                    initialSelected[item.id] = true;
                });
                setCartItems(fetchedCartItems);
                setSelectedItems(initialSelected);
                // setCartTotal(data.totalPrice || 0);
                console.log("selected items:", selectedItems);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching product detail:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartDetail();
    }, [id]); // Dependensi [id] memastikan fetch hanya berjalan saat ID berubah
    
    useEffect(() => {
        const newTotal = calculateTotal(cartItems, selectedItems);
        setCartTotal(newTotal);
    }, [cartItems, selectedItems]);

    if (loading) {
        return <div className="text-center pt-32">Memuat keranjang belanja...</div>;
    }

    if (error) {
        return <div className="text-center pt-32 text-red-500">Error: {error}</div>;
    }

    return(
        <div className="flex flex-col w-screen min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat">
            <Header/>
            <div className="">
                {/* List barang */}
                <p className="mt-30 text-2xl font-bold underline underline-offset-1">Checkout</p>
                <div className="flex flex-row justify-between ml-[25px] mr-[30px]">
                    {/* --- BAGIAN LIST BARANG (KIRI) --- */}
                    <div className="flex flex-col">
                        {
                            cartItems.length === 0 ? (
                            <p className="mt-5 text-xl">Keranjang Anda kosong.</p>
                        ) : (
                            cartItems.map((item) => (
                                item.Product && (
                                <div key={item.id} className="flex flex-row w-[464px] h-[154px] mt-5 items-center justify-between">
                                    <Checkbox className="!bg-white !text-black w-8 h-8 aspect-square shrink-0" checked={selectedItems[item.id] || false} onClick={(isChecked) => handleCheckboxChange(item.id, isChecked)} />
                                    <div className="w-[399px] bg-[#D9D9D9] flex p-5 items-center rounded-[12px]">
                                        <img src={`http://localhost:3001${item.Product.productImage}`} alt={item.productName} width="100px"/>
                                        <div className="pl-4 text-start">
                                            <h2 className="font-bold">{item.Product.productName}</h2>
                                            <h3>Quantity : {item.quantity}</h3>
                                            <h3>Price : {item.price}</h3>
                                        </div>
                                    </div>
                                </div>
                                ))
                            )
                        )}
                    </div>
                    {/* Kolom pembayaran */}
                    <div className="flex flex-col items-end">
                        <div className="flex flex-col w-[700px] h-[322px] mt-5 p-5 rounded-[12px] bg-[#D9D9D9]">
                            <p className="font-bold text-xl text-start">Order Summary</p>
                            <div className="w-[660px] overflow-x-auto">    
                                <Table className="rounded-[12px] bg-transparent items-start table-fixed">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-left w-[60%]">Nama produk</TableHead>
                                            <TableHead className="text-left w-[15%]">Qty.</TableHead>
                                            <TableHead className="text-left w-[25%]">Harga</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {/* MENGGUNAKAN DATA DINAMIS DARI API */}
                                        {cartItems.filter(item => selectedItems[item.id] && item.Product).map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="text-left w-[60%]">{item.Product.productName}</TableCell>
                                                <TableCell className="text-left w-[15%]">{item.quantity}</TableCell>
                                                <TableCell className="text-left w-[25%]">{item.Product.productPrice}</TableCell>
                                                </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex flex-col mt-5 ml-auto mr-15 items-end">
                                <div className="flex flex-row w-[150px] justify-between">
                                    <p className="font-bold">Subtotal</p>
                                    <p>Rp {cartTotal}</p>
                                </div>
                                <div className="flex flex-row w-[195px] justify-between">
                                    <p className="font-bold">Shipping Price</p>
                                    <p>Rp {shippingPrice}</p>
                                </div>
                                <div className="flex flex-row w-[205px] justify-between">
                                    <p className="font-bold">Assurance Price</p>
                                    <p>Rp {assurancePrice}</p>
                                </div>
                                <div className="flex flex-row w-[175px] justify-between">
                                    <p className="font-bold text-right">Grand Total</p>
                                    <p className="font-bold">Rp {grandTotal}</p>
                                </div>
                            </div>
                        </div>
                        <Button className="!bg-red-500 w-[173px] h-[50px] mt-[38px] !font-bold">Checkout</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CheckoutPage