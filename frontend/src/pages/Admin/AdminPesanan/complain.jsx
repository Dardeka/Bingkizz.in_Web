import { useNavigate } from "react-router-dom";
// import './konfirmasi-pembayaran.css'
import HeaderAdmin from "../../components/header-admin";
import { Button } from "../../../components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from "react";
import { useEffect } from "react";

function Complain(){
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/admin/pesanan-selesai");
    }

    const handleNext = () => {
        navigate("/admin/kelola-pesanan");
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
                <h1 className="text-3xl font-bold mb-5">Daftar Pesanan - Review</h1>
                <div className="flex flex-row justify-between my-5">
                    <Button className="!bg-red-500 !text-white" onClick={handleBack}>Lihat Pesanan Selesai</Button>
                    <Button className="!bg-red-500 !text-white" onClick={handleNext}>Kembali ke Kelola Pesanan</Button>
                </div>
                <div>
                    <Table>
                        <TableHeader className="border-b-2 border-solid border-black-700 bg-[#9f152f]">
                            <TableRow>
                                <TableHead className="text-center w-[33%] text-white">Product ID</TableHead>
                                <TableHead className="text-center w-[33%] text-white">Nama Produk</TableHead>
                                <TableHead className="text-center w-[33%] text-white">Review</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                                <TableRow className="h-[60px] hover:bg-gray-100">
                                    <TableCell className="w-[33%]">310823012</TableCell>
                                    <TableCell className="w-[33%]">Produk 1</TableCell>
                                    <TableCell className="w-[33%]"><Button className="!bg-[#9f152f]">Reviews</Button></TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>

    )
}

export default Complain