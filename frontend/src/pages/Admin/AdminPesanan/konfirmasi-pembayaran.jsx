import { useNavigate } from "react-router-dom";
// import './konfirmasi-pembayaran.css'
import { useEffect, useState} from "react"
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeaderAdmin from "../../components/header-admin";

function KonfirmasiPembayaran(){
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const handleBack = () => {
        navigate("/admin/kelola-pesanan");
    }

    const handleNext = () => {
        navigate("/admin/list-pesanan");
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
                    <Button className="!bg-red-500 !text-white" onClick={handleBack}>Back</Button>
                    <Button className="!bg-red-500 !text-white" onClick={handleNext}>Lihat List Pesanan</Button>
                </div>
                <div className="">
                    <Table>
                        <TableHeader className="border-b-2 border-solid border-black-700 bg-[#9f152f]">
                            <TableRow>
                                <TableHead className="text-center w-[20%] text-white">Order ID</TableHead>
                                <TableHead className="text-center w-[20%] text-white">Nama penerima</TableHead>
                                <TableHead className="text-center w-[20%] text-white">Grand Total</TableHead>
                                <TableHead className="text-center w-[20%] text-white">Status Pembayaran</TableHead>
                                <TableHead className="text-center w-[20%] text-white">Status Pengiriman</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.filter((item) => item.paymentStatus === "Pending" || item.paymentStatus === "Cancelled").map((item) => (
                                <TableRow key={item.id} className="h-[60px] hover:bg-gray-100">
                                    <TableCell className="w-[20%]">{item.id}</TableCell>
                                    <TableCell className="w-[20%]">{item.receiverName}</TableCell>
                                    <TableCell className="w-[20%]">{item.grandTotal}</TableCell>
                                    <TableCell className={`w-[20%]  ${item.paymentStatus === "Pending" ? "bg-yellow-500 font-semibold" : "bg-red-500 font-semibold text-white"}`}>{item.paymentStatus}</TableCell>
                                    <TableCell className="w-[20%]">{item.shippingStatus}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>

    )
}

export default KonfirmasiPembayaran