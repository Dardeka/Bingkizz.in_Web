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
} from "@/components/ui/dialog";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {Formik, Form, Field, ErrorMessage} from "formik";
import HeaderAdmin from "../../components/header-admin";

function PesananDikirim(){
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [shipmentPicture, setShipmentPicture] = useState(null);
    const [shipmentPicPreview, setShipmentPicPreview] = useState(null);

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

    const initialVal = {
        shipmentNum: '',
        shipmentName: '',
        shipmentDate: '',
        shipmentPic: shipmentPicture || null,
    }

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if(file){
            const fileURL = URL.createObjectURL(file);
            setProfilePicPreview(fileURL);
            // console.log("This is the file: ", file);
            setProfilePicture(file);
        }
    }

    return(
        <div>
            <HeaderAdmin/>
            <div className="px-10 w-screen pt-32">
                <h1 className="text-3xl font-bold mb-5">Daftar Pesanan - Pesanan Dikirim</h1>
                <div className="flex flex-row justify-between my-5">
                    <Button className="!bg-red-500 !text-white" onClick={handleBack}>Lihat List Pesanan</Button>
                    <Button className="!bg-red-500 !text-white" onClick={handleNext}>Lihat Pesanan Selesai</Button>
                </div>
                <div>
                    <Table>
                        <TableHeader className="border-b-2 border-solid border-black-700 bg-[#9f152f]">
                            <TableRow>
                                <TableHead className="text-center w-[16%] text-white">Order ID</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Nama penerima</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Grand Total</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Status Pembayaran</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Status Pengiriman</TableHead>
                                <TableHead className="text-center w-[16%] text-white">Detail Pengiriman</TableHead>
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
                                    <TableCell className="w-[16%]">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="ml-auto">Tambah Detail Pengiriman</Button>
                                            </DialogTrigger>
                                            {/* Mengganti tag <form> dengan <Formik> dan merender <DialogContent> di dalamnya */}
                                            <Formik
                                                enableReinitialize
                                                initialValues={initialVal}
                                                // onSubmit={submitData}
                                            >
                                                <DialogContent className="sm:max-w-4xl"> {/* Diperbesar agar sesuai dengan Form */}
                                                <DialogHeader>
                                                    <DialogTitle>Update Pengiriman</DialogTitle>
                                                    <DialogDescription>
                                                    Tambahkan detail pengiriman untuk pesanan ini.
                                                    </DialogDescription>
                                                </DialogHeader>
                        
                                                {/* Formik Form */}
                                                <Form className="flex flex-col mt-[50px] gap-[50px] ml-[60px] p-4">
                                                    <div className="flex flex-row">
                                                        <div className="flex flex-col">
                                                            <label>Upload Bukti Pengiriman</label>
                                                            <input
                                                            type="file"
                                                            id="shipmentPic"
                                                            name="shipmentPic"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            className="w-[220px] h-[30px] mt-[10px] bg-[#D9D9D9] rounded-[12px] p-1"
                                                            />
                                                            {shipmentPicPreview && (
                                                            <img
                                                                src={shipmentPicPreview}
                                                                alt="Shipment Preview"
                                                                className="w-[220px] h-[220px] rounded-[12px] object-cover mt-4"
                                                            />
                                                            )}
                                                        </div>
                                                        <div className="ml-[58px]">
                                                            <div className="text-start mb-[13px] flex flex-col">
                                                                <label>Nomor Pengiriman</label>
                                                                <Field
                                                                    autocomplete="off"
                                                                    id="shipmentNum"
                                                                    name="shipmentNum"
                                                                    className="w-[409px] h-[35px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"
                                                                />
                                                                <ErrorMessage name="shipmentNum" component="span" className="text-red-500 text-sm" />
                                                            </div>
                                                            <div className="text-start mb-[13px] flex flex-col">
                                                                <label>Nama Jasa Pengiriman</label>
                                                                <Field
                                                                    autocomplete="off"
                                                                    id="shipmentName"
                                                                    name="shipmentName"
                                                                    className="w-[409px] h-[35px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"
                                                                />
                                                                <ErrorMessage name="shipmentName" component="span" className="text-red-500 text-sm" />
                                                            </div>
                                                            <div className="text-start mb-[26px] flex flex-col">
                                                                <label className="mt-[10px]">Tanggal Pengiriman</label>
                                                                <Field
                                                                    autocomplete="off"
                                                                    id="shipmentDate"
                                                                    name="shipmentDate"
                                                                    className="w-[409px] h-[35px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"
                                                                />
                                                                <ErrorMessage name="shipmentDate" component="span" className="text-red-500 text-sm" />
                                                            </div>
                                                            <div className="ml-[10px]">
                                                                <label className="mt-[10px]">Apakah pesanan sudah sampai?</label>
                                                                <RadioGroup defaultValue="Belum-sampai" className="mt-2 flex flex-row">
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value="Belum-sampai" id="option-one" />
                                                                        <label htmlFor="option-one">Belum Sampai</label>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <RadioGroupItem value="Sudah-sampai" id="option-two" />
                                                                        <label htmlFor="option-two">Sudah Sampai</label>
                                                                    </div>
                                                                </RadioGroup> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter className="mt-4">
                                                    <DialogClose asChild>
                                                        <Button variant="outline" type="button">
                                                        Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    {/* Tombol submit Formik */}
                                                    <Button type="submit" className="!bg-[#F4476D] cursor-pointer hover:!bg-[#D1345B] hover:shadow-xl/10" onClick={() => {navigate('/profile')}}>
                                                        Simpan Info
                                                    </Button>
                                                    </DialogFooter>
                                                </Form>
                                                </DialogContent>
                                            </Formik>
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

export default PesananDikirim