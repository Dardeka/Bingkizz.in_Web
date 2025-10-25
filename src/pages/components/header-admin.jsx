import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"

function HeaderAdmin(){
    const navigate = useNavigate()

    const handleAdminHome = () => {
        navigate("/dashboard-admin")
    }

    const handleProducts_Admin = () => {
        navigate("/kelola-produk")
    }

    return(
        <div>
            {/* Header Section */}
            <div className="fixed flex top-0 left-0 w-full h-[90px] pl-10 pr-10 bg-[#9f152f] shadow-2xl z-10">
                <img src="/logo/white_logoTeksOnly.png" alt="" width="200px" className="mt-auto mb-auto" onClick={() => {handleHome()}}/>
                <div className="flex mt-auto mb-auto ml-auto w-[650px] justify-evenly">
                    <Button className="!bg-transparent !text-white hover:!decoration-underline" onClick={() => handleAdminHome()} >Home</Button>
                    <Button className="!bg-transparent !text-white hover:!decoration-underline" >Manage Orders</Button>
                    <Button className="!bg-transparent !text-white hover:!decoration-underline" onClick={() => handleProducts_Admin()}>Manage Products</Button>
                    <Button className="text-black" >Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin