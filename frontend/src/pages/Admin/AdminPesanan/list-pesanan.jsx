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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import HeaderAdmin from "../../components/header-admin";

function ListPesanan(){
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const handleBack = () => {
        navigate("/admin/konfirmasi-pembayaran");
    }

    const handleNext = () => {
        navigate("/admin/pesanan-dikirim");
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
    
    async function handleUpdateShipment(orderID, status){
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/order/updateOrder`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderID,
                    targetStatus: "Shipment",
                    status: status
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update order status');
            }
            const updatedOrder = await response.json();
            console.log('Order status updated:', updatedOrder);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

    return(
        <div>
            <HeaderAdmin/>
            <div className="px-10 w-screen pt-32">
                <div className="flex flex-row justify-between my-5">
                    <Button className="!bg-red-500 !text-white" onClick={handleBack}>Lihat Konfirmasi Pembayaran</Button>
                    <Button className="!bg-red-500 !text-white" onClick={handleNext}>Lihat Pesanan Dikirim</Button>
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
                                <TableHead className="text-center w-[16%]">Detail Pesanan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.filter((item) => item.paymentStatus === "Paid" && item.shippingStatus === "Processing Order").map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="w-[16%]">{item.id}</TableCell>
                                    <TableCell className="w-[16%]">{item.receiverName}</TableCell>
                                    <TableCell className="w-[16%]">{item.grandTotal}</TableCell>
                                    <TableCell className="w-[16%] bg-green-500 font-bold">{item.paymentStatus}</TableCell>
                                    <TableCell className="w-[16%]">{item.shippingStatus}</TableCell>
                                    <TableCell className="w-[16%]">
                                        <Dialog>
                                            <form>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" className="shadow-xl">Detail</Button>
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
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                        <Button variant="outline" className="text-white !bg-red-700">Cancel</Button>
                                                        </DialogClose>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger className="h-9 flex items-center !text-white !bg-blue-700">Complete Step</AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        By continuing, you confirm that the order has been packed and ready for shipment.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="!bg-red-700 !text-white">Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction className="!bg-green-500 !text-white" onClick={() => handleUpdateShipment(item.id, "On Delivery")}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DialogFooter>
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

export default ListPesanan