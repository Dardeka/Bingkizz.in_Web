import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import HeaderAdmin from "../components/header-admin"

function DashboardAdmin() {
    const navigate = useNavigate();
    const handleNewOrder = () => {
        navigate("/KelolaPesanan");
    }

    return(
        <div className="static top-0 pt-32 h-[1920px] max-w-screen left-0 bg-[url(/images/Background.png)]">
            <HeaderAdmin/>
            <img className="flex w-[988px] h-[300px] ml-[146px] mr-[146px] bg-[#9F152F] rounded-[12px]" src="/logo/headline admin.png" alt="" />
            {/* Kelola Pesanan */}
            <div className="flex flex-col max-w-[1096px] h-[387px] mr-auto ml-auto mt-[100px] justify-between">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="font-bold">Pesanan Terbaru :</h3>
                    <Button className="!bg-[#9F152F] text-white" onClick={handleNewOrder}>Lihat Selengkapnya</Button>
                </div>
                <div className="w-[1096px] h-[333px] bg-[#9F152F] rounded-[12px]">
                    {/* Grid Pesanan */}
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