import React, { useState, useRef, useEffect } from 'react';
import HeaderAdmin from "../components/header-admin"
import { Button } from "../../components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

function KelolaProduk(){
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [addFormData, setAddFormData] = useState({
        name: '',
        desc: '',
        stock: '',
        price: '',
        image: null,
    });

    // Handler buat tambah produk
    const handleAddProduct = () => {
        setAddFormData({
            name: '',
            desc: '',
            stock: '',
            price: '',
            image: null,
        });
        setIsAddDialogOpen(true);
    }

    const handleAddFormChange = (e) => {
        const { name, value } = e.target;
        setAddFormData({ ...addFormData, [name]: value });
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    

    const products = [
        {
            id: "001",
            name: "Birthday Hampers-Blue",
            stock: 8,
            price: 25000,
            status: "active"
        },
        {
            id: "002",
            name: "Birthday Hampers-Pink",
            stock: 8,
            price: 25000,
            status: "active"
        },
    ]

    return(
        <div className="static top-0 pt-32 h-[1920px] w-screen left-0 bg-[url(/images/Background.png)]">
            <HeaderAdmin/>
            <div className="flex flex-col w-[1096px] mr-auto ml-auto">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold">Kelola Produk</h3>
                    <Dialog>
                    <form>
                        <DialogTrigger asChild>
                        <Button variant="outline" className="!bg-[#9F152F] text-white">Tambah Produk</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Tambah Produk</DialogTitle>
                            <DialogDescription>
                            Masukkan data-data produk yang ingin dimasukkan
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                            <label htmlFor="name-1">Nama Produk</label>
                            <Input id="name-1" name="name" />
                            </div>
                            <div className="grid gap-3">
                            <label htmlFor="username-1">Deskripsi Produk</label>
                            <Input id="username-1" name="username" />
                            </div>
                            <div className="grid gap-3">
                            <label htmlFor="username-1">Jumlah Stok</label>
                            <Input id="username-1" name="username" />
                            </div>
                            <div className="grid gap-3">
                            <label htmlFor="username-1">Harga Produk</label>
                            <Input id="username-1" name="username" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Tambah</Button>
                        </DialogFooter>
                        </DialogContent>
                    </form>
                    </Dialog>
                </div>
                {/* Tabel */}
                <div className="w-[1096px] min-h-[100px] h-auto bg-[#9F152F] rounded-[12px] mt-5 p-10">
                    <Table className="rounded-[12px] bg-white">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px] text-center">ID Produk</TableHead>
                            <TableHead className="text-center">Nama produk</TableHead>
                            <TableHead className="text-center">Jumlah Stok</TableHead>
                            <TableHead className="text-center">Harga jual</TableHead>
                            <TableHead className="text-center">Status Penjualan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((products) => (
                                <TableRow>
                                    <TableCell className="font-medium">{products.id}</TableCell>
                                    <TableCell>{products.name}</TableCell>
                                    <TableCell>{products.stock}</TableCell>
                                    <TableCell>{products.price}</TableCell>
                                    <TableCell className="text-center">{products.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
            </div>
        </div>
    )
}

export default KelolaProduk