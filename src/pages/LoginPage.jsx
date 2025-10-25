import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import Header from "./components/header"

function LoginPage(){
    const navigate = useNavigate()

    const handleRegist = () => {
        navigate("/register")
    }

    return(
        <div className="static top-0 left-0 mt-10 bg-[url(/images/Background.png)] w-screen">
            <Header/>
            <div className="flex flex-row top-0">
                <img src="/images/loginImg.png" alt="" />
                <div className="flex flex-col mt-20 ml-[80px]">
                    <p className="flex text-2xl font-bold items-start">Login</p>
                    <hr />
                    <div className="flex flex-col items-start mt-[26px]">
                        <p>Username</p>
                        <Input id="username" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20" />
                    </div>
                    <div className="flex flex-col items-start mt-[26px]">
                        <p>Password</p>
                        <Input id="password" type="password" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20"/>
                    </div>
                    <Button className="!bg-[#F4476D] mt-[50px] w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20">LOGIN</Button>
                    <div className="flex flex-col items-center mt-[26px]">
                        <p>or Sign In with</p>
                        <Button className="!bg-[#FF7070] flex flex-row justify-center items-center mt-[26px] w-[200px] h-[47px] shadow-xl/20"><img src="/logo/icon_google.png" alt="" /> Google</Button>
                        <p className="mt-[35px]">New Here? <a onClick={() => handleRegist()}>Create new account</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage