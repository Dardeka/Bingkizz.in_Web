import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function Header(){
    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/")
    }

    const handleOurProduct = () => {
        navigate("/ProductPage")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    const handleRegist = () => {
        navigate("/register")
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
                <div className="flex mt-auto mb-auto ml-auto w-[850px] text-center justify-evenly">
                    <Button className="!bg-transparent !text-white hover:!decoration-underline" onClick={() => handleHome()}>Home</Button>
                    <Button className="!bg-transparent !text-white hover:!decoration-underline" onClick={() => handleOurProduct()} >Our Product</Button>
                    <Button className="!bg-transparent !text-white hover:!decoration-underline" >How to Buy</Button>
                    <Button className="!bg-transparent !text-white hover:!decoration-underline" >About Us</Button>
                    <Button className="!bg-transparent !text-white hover:!decoration-underline" >Contact Us</Button>
                    <Button className="text-black" onClick={() => handleLogin()}>Sign In</Button>
                    <Button className="text-black" onClick={() => handleRegist()}>Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

export default Header