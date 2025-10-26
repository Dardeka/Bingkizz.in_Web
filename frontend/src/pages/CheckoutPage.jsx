import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import Footer from "./components/footer"
import Header from "./components/header"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function CheckoutPage(){
    const orders = [
        {
            name: "Hampers pinky murah dan lucu",
            qty: 1,
            price: "25,000",
        }
    ]

    return(
        <div className="flex flex-col w-screen min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat">
            <Header/>
            <div className="">
                {/* List barang */}
                <p className="mt-30 text-2xl font-bold underline underline-offset-1">Checkout</p>
                <div className="flex flex-row justify-between ml-[50px] mr-[44px]">
                    {/* barang */}
                    <div className="flex flex-col">
                        <div className="flex flex-row w-[464px] h-[154px] mt-5 items-center justify-between">
                            <Checkbox className="!bg-white !text-black w-8 h-8 aspect-square shrink-0"/>
                            <div className="w-[399px] bg-[#D9D9D9] flex p-5 items-center rounded-[12px]">
                                <img src="/public/products/varBlue.jpg" alt="" width="100px"/>
                                <div className="pl-4 text-start">
                                    <h2 className="font-bold" >Hampers pinky murah dan lucu</h2>
                                    <h3>Quantity : 100 box</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[464px] h-[154px] mt-5 items-center justify-between">
                            <Checkbox className="!bg-white !text-black w-8 h-8 aspect-square shrink-0"/>
                            <div className="w-[399px] bg-[#D9D9D9] flex p-5 items-center rounded-[12px]">
                                <img src="/public/products/varBlue.jpg" alt="" width="100px"/>
                                <div className="pl-4 text-start">
                                    <h2 className="font-bold" >Hampers pinky murah dan lucu</h2>
                                    <h3>Quantity : 100 box</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-[464px] h-[154px] mt-5 items-center justify-between">
                            <Checkbox className="!bg-white !text-black w-8 h-8 aspect-square shrink-0"/>
                            <div className="w-[399px] bg-[#D9D9D9] flex p-5 items-center rounded-[12px]">
                                <img src="/public/products/varBlue.jpg" alt="" width="100px"/>
                                <div className="pl-4 text-start">
                                    <h2 className="font-bold" >Hampers pinky murah dan lucu</h2>
                                    <h3>Quantity : 100 box</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Kolom pembayaran */}
                    <div className="flex flex-col items-end">
                        <div className="flex flex-col w-[666px] h-[322px] mt-5 p-5 rounded-[12px] bg-[#D9D9D9]">
                            <p className="font-bold text-xl text-start">Order Summary</p>
                            <Table className="rounded-[12px] bg-transparent items-start">
                                <TableHeader>
                                    <TableRow>
                                    <TableHead className="text-left">Nama produk</TableHead>
                                    <TableHead className="text-left">Qty.</TableHead>
                                    <TableHead className="text-left">Harga</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((orders) => (
                                        <TableRow>
                                            <TableCell className="text-left">{orders.name}</TableCell>
                                            <TableCell className="text-left">{orders.qty}</TableCell>
                                            <TableCell className="text-left">{orders.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex flex-col mt-5 ml-auto mr-15 items-end">
                                <div className="flex flex-row w-[150px] justify-between">
                                    <p className="font-bold">Subtotal</p>
                                    <p>25,000</p>
                                </div>
                                <div className="flex flex-row w-[195px] justify-between">
                                    <p className="font-bold">Shipping Price</p>
                                    <p>10,000</p>
                                </div>
                                <div className="flex flex-row w-[205px] justify-between">
                                    <p className="font-bold">Assurance Price</p>
                                    <p>10,000</p>
                                </div>
                                <div className="flex flex-row w-[175px] justify-between">
                                    <p className="font-bold text-right">Grand Total</p>
                                    <p>45,000</p>
                                </div>
                            </div>
                        </div>
                        <Button className="!bg-red-500 w-[173px] h-[50px] mt-[38px] !font-bold">Checkout</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CheckoutPage