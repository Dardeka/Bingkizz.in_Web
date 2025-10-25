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

function KelolaProduk(){
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
                    <Button className="!bg-[#9F152F] text-white">Tambah Produk</Button>
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