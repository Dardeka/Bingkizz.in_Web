import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Header from "./components/header";

function RegistPage() {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }

    return(
        <div className="static top-0 left-0 mt-10 bg-[url(/images/Background.png)] w-screen">
            <Header/>
            <div className="flex flex-row top-0">
                <img src="/images/registImg.png" alt="" />
                <div className="flex flex-col mt-20 ml-[80px]">
                    <p className="flex text-2xl font-bold items-start">Register</p>
                    <hr />
                    <div className="flex flex-col items-start mt-[26px]">
                        <p>Username</p>
                        <Input id="username" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20" />
                    </div>
                    <div className="flex flex-col items-start mt-[10px]">
                        <p>Email</p>
                        <Input id="email" type="password" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20"/>
                    </div>
                    <div className="flex flex-col items-start mt-[10px]">
                        <p>Password</p>
                        <Input id="password" type="password" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20"/>
                    </div>
                    <div className="flex flex-col items-start mt-[10px]">
                        <p>Confirm Password</p>
                        <Input id="password" type="password" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20"/>
                    </div>
                    <Button className="!bg-[#F4476D] mt-[59px] w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20">REGISTER</Button>
                    <p className="mt-[35px]">Already have account? <a onClick={() => handleLogin()}>Sign In</a></p>
                </div>
            </div>
        </div>
    )
}

export default RegistPage