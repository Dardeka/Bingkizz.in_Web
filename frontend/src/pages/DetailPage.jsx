import { Button } from "../components/ui/button"
import Footer from "./components/footer";
import Header from "./components/header"
import { FaCartPlus } from "react-icons/fa";

function DetailPage(){
    return(
        <div className="flex flex-col w-screen min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat">
            <Header/>
            <div className="flex flex-row w-[1196px] h-[495px] mt-30 ml-auto mr-auto bg-[#9F152F] p-5 rounded-[12px]">
                <img src="/products/varBlue.jpg" alt="" width="413px" height="313px" />
                <div className="flex flex-col text-white ml-[80px] w-full mr-[45px]">
                    <div className="flex flex-col items-start">
                        <p className="text-[32px] font-bold">Hampers Biru murah dan lucu</p>
                        <p className="w-[484px] text-start text-xl mt-[43px]">Hampers yang simple dan lucu dengan isi beragam jenis jajanan yang menarik dan warna yang senada.
    Produk sesuai gambar.</p>
                        <p className="text-xl mt-[27px]"><b>Tersedia :</b> 256</p>
                    </div>

                    <div className="flex flex-row w-[150px] h-[40px] bg-[#B87B7B] mt-[39px] items-center justify-between rounded-[6px] items-start">
                        <Button className="!bg-transparent">-</Button>
                        <p className="text-black bg-white w-[50px] h-[40px] content-center">1</p>
                        <Button className="!bg-transparent">+</Button>
                    </div>
                    <div className="flex mt-[25px] justify-end">
                        <Button className="!bg-[#00FF62] !text-black w-[180px]"><FaCartPlus /> Add to Cart</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default DetailPage