import { useNavigate } from "react-router-dom";
// import './konfirmasi-pembayaran.css'
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import HeaderAdmin from "../../components/header-admin";

function PesananSelesai(){
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const handleBack = () => {
        navigate("/admin/pesanan-dikirim");
    }

    const handleNext = () => {
        navigate("/admin/reviews");
    }

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order/showOrders`);

                if(!response.ok){
                    return res.status(500).json('Failed to fetch order data');
                }

                const respData = await response.json();
                console.log("ini adalah isi dari fetch data: ",respData);

                // Format order layout
                const formattedOrders = respData.map(item => ({
                    id: item._id,
                    receiverName: item.receiverName,
                    grandTotal: item.grandTotal,
                    paymentStatus: item.paymentStatus,
                    shippingStatus: item.shippingStatus
                }));

                console.log("ini adalah isi dari formatted orders: ",formattedOrders);
                setOrders(formattedOrders);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, []);
    
    return(
        <div>
            <HeaderAdmin/>
            <div className="px-10 w-screen pt-32 mb-20">
                <h1 className="text-3xl font-bold mb-5">Daftar Pesanan - Pesanan Selesai</h1>
                <div className="flex flex-row justify-between my-5">
                    <Button className="!bg-red-500 !text-white" onClick={handleBack}>Lihat Pesanan Dikirim</Button>
                    <Button className="!bg-red-500 !text-white" onClick={handleNext}>Lihat Review</Button>
                </div>
                <div>
                    <Table>
                        <TableHeader className="border-b-2 border-solid border-black-700 bg-[#9f152f] rounded-t-[12px]">
                            <TableRow>
                                <TableHead className="text-center w-[16%] text-white">Order ID</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Nama penerima</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Grand Total</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Status Pembayaran</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Status Pengiriman</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.filter((item) => item.shippingStatus === "Delivered").map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="w-[16%]">{item.id}</TableCell>
                                    <TableCell className="w-[16%]">{item.receiverName}</TableCell>
                                    <TableCell className="w-[16%]">{item.grandTotal}</TableCell>
                                    <TableCell className="w-[16%] bg-green-500 font-bold">{item.paymentStatus}</TableCell>
                                    <TableCell className="w-[16%] bg-green-500 font-bold">{item.shippingStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>

    )
}

export default PesananSelesai