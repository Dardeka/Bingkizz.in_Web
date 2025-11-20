import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "../../components/header";
import HeaderAdmin from "../../components/header-admin";

function PesananDikirim(){
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const handleBack = () => {
        navigate("/admin/list-pesanan");
    }

    const handleNext = () => {
        navigate("/admin/pesanan-selesai");
    }

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/showOrders`);

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
            <div className="px-10 w-screen pt-32">
                <div className="flex flex-row justify-between my-5">
                    <Button className="!bg-red-500 !text-white" onClick={handleBack}>Lihat List Pesanan</Button>
                    <Button className="!bg-red-500 !text-white" onClick={handleNext}>Lihat Pesanan Selesai</Button>
                </div>
                <div>
                    <Table>
                        <TableHeader className="border-b-2 border-solid border-black-700">
                            <TableRow>
                                <TableHead className="text-center w-[16%]">Order ID</TableHead>
                                <TableHead className="text-center w-[16%]">Nama penerima</TableHead>
                                <TableHead className="text-center w-[16%]">Grand Total</TableHead>
                                <TableHead className="text-center w-[16%]">Status Pembayaran</TableHead>
                                <TableHead className="text-center w-[16%]">Status Pengiriman</TableHead>
                                <TableHead className="text-center w-[16%]">Detail Pengiriman</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.filter((item) => item.paymentStatus === "Paid" && item.shippingStatus === "On Delivery").map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="w-[16%]">{item.id}</TableCell>
                                    <TableCell className="w-[16%]">{item.receiverName}</TableCell>
                                    <TableCell className="w-[16%]">{item.grandTotal}</TableCell>
                                    <TableCell className="w-[16%] bg-green-500 font-bold">{item.paymentStatus}</TableCell>
                                    <TableCell className="w-[16%]">{item.shippingStatus}</TableCell>
                                    <TableCell className="w-[16%]"><Button className="!bg-white !text-black rounded-[12px] shadow-xl/20">Detail</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>

    )
}

export default PesananDikirim