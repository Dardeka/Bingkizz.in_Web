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

function KelolaPesanan(){
    const orders = [
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
                <div className="flex flex-row items-center">
                    <h3 className="font-bold">Kelola Pesanan</h3>
                </div>
                {/* Tabel */}
                <div className="w-[1096px] min-h-[100px] h-auto bg-[#9F152F] rounded-[12px] mt-5 p-10">
                    <Table className="rounded-[12px] bg-white">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px] text-center">ID Pesanan</TableHead>
                            <TableHead className="text-center">Nama produk</TableHead>
                            <TableHead className="text-center">Jumlah Stok</TableHead>
                            <TableHead className="text-center">Harga jual</TableHead>
                            <TableHead className="text-center">Status Penjualan</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((orders) => (
                                <TableRow>
                                    <TableCell className="font-medium">{orders.id}</TableCell>
                                    <TableCell>{orders.name}</TableCell>
                                    <TableCell>{orders.stock}</TableCell>
                                    <TableCell>{orders.price}</TableCell>
                                    <TableCell className="text-center">{orders.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default KelolaPesanan