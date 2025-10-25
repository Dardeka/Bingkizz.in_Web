import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function Header(){
    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/")
    }

    const scrollTo = (id) => {
        const element = document.getElementById(id)
        const navbarHeight = 90

        if (element) {
        const offsetPosition = element.offsetTop - navbarHeight
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        })
        }
    }

    return(
        <div>
            {/* Header Section */}
            <div className="fixed flex top-0 left-0 w-full h-[90px] pl-10 pr-10 bg-[#9f152f] shadow-2xl z-10">
                <img src="/logo/white_logoTeksOnly.png" alt="" width="200px" className="mt-auto mb-auto" onClick={() => {handleHome()}}/>
                <div className="flex mt-auto mb-auto ml-auto w-[650px] justify-evenly">
                    <Button className="text-black" onClick={() => scrollTo("HERO")}>Home</Button>
                    <Button className="text-black" onClick={() => scrollTo("PRODUCT")}>Our Product</Button>
                    <Button className="text-black" >How to Buy</Button>
                    <Button className="text-black" >About Us</Button>
                    <Button className="text-black" >Contact Us</Button>
                </div>
            </div>
        </div>
    )
}

export default Header