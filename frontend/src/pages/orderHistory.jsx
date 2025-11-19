import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import Header from "./components/header";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom";

function OrderHistory() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');

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

        const payload = decodeJWT(token);
        setUserID(payload.id);

        const fetchOrderData = async () => {
            try {
                const response = await fetch('${import.meta.env.VITE_BACKEND_URL}/api/admin/order/showOrders');

                if(!response.ok){
                    return res.status(500).json('Failed to fetch order data');
                }

                const respData = await response.json();
                console.log("ini adalah isi dari fetch data: ",respData);

                // Format order layout
                const formattedOrders = respData.map(item => ({
                    id: item._id,
                    userId: item.userId,
                    receiverName: item.receiverName,
                    items: item.items,
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

    const handleProfile = () => {
        navigate("/profile");
    }

    return(
        <div className="w-screen h-screen top-0 left-0 right-0 font-montserrat bg-cover pt-[115px] bg-[url(/images/Background.png)]">
            <Header/>
            {/* Start user profile section */}
            <div className="w-[1110px] h-[540px] bg-[#F1DFE4] flex flex-row mx-auto pt-[37px] pl-[33px] pr-[60px] shadow-xl/20">
                <div className="h-[450px] flex flex-col items-center pr-[40px] mr-[40px] border-r-2 border-black/10">
                    <h3 className="font-bold">User Profile</h3>
                    <div className="flex flex-col mt-[27px] gap-[20px]">
                        <Button className="!bg-transparent !text-black !w-[150px] cursor-pointer hover:!bg-gray-300 hover:shadow-xl/10" onClick={handleProfile}>User Info</Button>
                        <Button className="!bg-gray-300 !text-black !w-[150px] cursor-pointer hover:!bg-gray-300 hover:shadow-xl/10">Order History</Button>
                    </div>
                </div>
                <div className="mt-[20px]">
                    <Table>
                        <TableHeader className="border-b-2 border-solid border-black/10">
                            <TableRow>
                                <TableHead className="text-center w-[16%]">Order ID</TableHead>
                                <TableHead className="text-center w-[16%]">Grand Total</TableHead>
                                <TableHead className="text-center w-[16%]">Status Pembayaran</TableHead>
                                <TableHead className="text-center w-[16%]">Status Pengiriman</TableHead>
                                <TableHead className="text-center w-[16%]">Detail Pesanan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.filter((item) => item.userId === userID).map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="w-[16%]">{item.id}</TableCell>
                                    <TableCell className="w-[16%]">{item.grandTotal}</TableCell>
                                    <TableCell className="w-[16%]">{item.paymentStatus}</TableCell>
                                    <TableCell className="w-[16%]">{item.shippingStatus}</TableCell>
                                    <TableCell className="w-[16%]">
                                        <Dialog>
                                            <form>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline">Detail</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Order Detail</DialogTitle>
                                                        <DialogDescription>
                                                            These are the details for order ID: {item.id}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <Table>
                                                        <TableHeader className="border-b-2 border-solid border-black-700">
                                                            <TableRow>
                                                                <TableHead className="text-center w-[50%]">Product Name</TableHead>
                                                                <TableHead className="text-center w-[50%]">Quantity</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {item.items && item.items.map((prod, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell className="text-left pl-[40px] w-[50%]">{prod.productName}</TableCell>
                                                                    <TableCell className="text-center w-[50%]">{prod.quantity}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </DialogContent>
                                            </form>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default OrderHistory;