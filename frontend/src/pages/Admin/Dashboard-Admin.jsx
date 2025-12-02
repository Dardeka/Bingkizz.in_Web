import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import HeaderAdmin from "../components/header-admin"
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DashboardAdmin() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const handleNewOrder = () => {
        navigate("/admin/list-pesanan");
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
                    shippingStatus: item.shippingStatus,
                    items: item.items
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
        <div className="static top-0 pt-32 h-[1920px] max-w-screen left-0 bg-[url(/images/Background.png)]">
            <HeaderAdmin/>
            <div className="flex flex-row justify-between ml-[59px] mr-[59px]">
                <div className="flex flex-col w-[350px] h-[150px] bg-[#9F152F] shadow-xl/20 drop-shadow-xl rounded-[12px] items-start pl-[34px] pt-[20px]">
                    <h1 className="font-semibold text-xl text-white">New Order</h1>
                    <p className="text-white text-xs">( Waiting for payment )</p>
                    <div className="flex flex-row items-start mt-[18px]">
                        <img src="/Icons/new_order.png" alt="" width="35px"/>
                        {orders.filter(order => order.paymentStatus === 'Pending').length > 0 ?
                            <h2 className="font-bold text-3xl text-white ml-[12px]">{orders.filter(order => order.paymentStatus === 'Pending').length}</h2>
                            :
                            <h2 className="font-bold text-3xl text-white ml-[12px]">0</h2>
                        }
                    </div>
                </div>
                <div className="flex flex-col w-[350px] h-[150px] bg-[#9F152F] shadow-xl/20 drop-shadow-xl rounded-[12px] items-start pl-[34px] pt-[24px]">
                    <h1 className="font-semibold text-xl text-white">Processing Order</h1>
                    <div className="flex flex-row items-start mt-[18px]">
                        <img src="/Icons/process.png" alt="" width="35px"/>
                        {orders.filter(order => order.shippingStatus === 'Processing Order').length > 0 ?
                            <h2 className="font-bold text-3xl text-white ml-[12px]">{orders.filter(order => order.shippingStatus === 'Processing Order').length}</h2>
                            :
                            <h2 className="font-bold text-3xl text-white ml-[12px]">0</h2>
                        }
                    </div>
                </div>
                <div className="flex flex-col w-[350px] h-[150px] bg-[#9F152F] shadow-xl/20 drop-shadow-xl rounded-[12px] items-start pl-[34px] pt-[24px]">
                    <h1 className="font-semibold text-xl text-white">Out for Delivery</h1>
                    <div className="flex flex-row items-start mt-[18px]">
                        <img src="/Icons/delivery.png" alt="" width="35px"/>
                        {orders.filter(order => order.shippingStatus === 'On Delivery').length > 0 ?
                            <h2 className="font-bold text-3xl text-white ml-[12px]">{orders.filter(order => order.shippingStatus === 'On Delivery').length}</h2>
                            :
                            <h2 className="font-bold text-3xl text-white ml-[12px]">0</h2>
                        }
                    </div>
                </div>
            </div>
            {/* Kelola Pesanan */}
            <div className="flex flex-col max-w-[1096px] h-[387px] mr-auto ml-auto mt-[100px] justify-between">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold">Pesanan Terbaru :</h3>
                    <Button className="!bg-[#9F152F] text-white" onClick={handleNewOrder}>Lihat Selengkapnya</Button>
                </div>
                <div className="w-[1096px] h-[333px] bg-[#9F152F] rounded-[12px]">
                    <Table>
                        <TableHeader className="border-b-2 border-solid border-black-700 bg-[#9f152f]">
                            <TableRow>
                                <TableHead className="text-center w-[16%] text-white">Order ID</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Nama penerima</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Grand Total</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Status Pembayaran</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.filter((item) => item.paymentStatus === "Paid").map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="w-[16%] text-white">{item.id}</TableCell>
                                    <TableCell className="w-[16%] text-white">{item.receiverName}</TableCell>
                                    <TableCell className="w-[16%] text-white">{item.grandTotal}</TableCell>
                                    <TableCell className="w-[16%] bg-green-500 font-bold">{item.paymentStatus}</TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Kelola Produk */}
            <div className="flex flex-col max-w-[1096px] h-[387px] mr-auto ml-auto mt-[80px] justify-between">
                <div className="flex flex-row items-center">
                    <h3 className="font-bold">Produk Terlaris :</h3>
                </div>
                <div className="w-[1096px] h-[333px] bg-[#9F152F] rounded-[12px]">
                    {/* Grid Produk */}
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin