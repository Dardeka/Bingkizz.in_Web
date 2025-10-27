import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, User, LogOut } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Header(){
    const [accessToken, setAccessToken] = useState(null); 

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken'); 
        
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken"); 

        setAccessToken(null); 

        navigate("/"); 
    }

    const navigate = useNavigate()

    const handleHome = () => {
        navigate("/")
    }

    const handleOurProduct = () => {
        navigate("/ProductPage")
    }

    function decodeJWT(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    const handleCart = () => {
        const payload = decodeJWT(accessToken);
        navigate('/checkout/'+payload.id);
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
                    {accessToken ? (
                        <>
                            {/* Shopping Cart - Ukuran Seragam: p-0 h-10 w-10 */}
                            <Button 
                                variant="ghost" 
                                className="p-0 h-10 w-10 rounded-full" 
                                onClick={handleCart}
                            >
                                <ShoppingCart className="h-6 w-6 text-black" /> 
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild> 
                                    {/* User Profile - Ukuran Seragam: p-0 h-10 w-10 */}
                                    <Button variant="ghost" className="p-0 h-10 w-10 rounded-full"> 
                                        <User className="h-6 w-6 text-black" /> 
                                    </Button>
                                </DropdownMenuTrigger>
                                
                                <DropdownMenuContent className="w-40" align="end" forceMount>
                                    <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                                    {/* Tombol Logout di dalam Dropdown */}
                                    <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Keluar</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button className="text-black bg-transparent hover:bg-white/10" onClick={() => handleLogin()}>Sign In</Button>
                            <Button className="text-black bg-transparent hover:bg-white/10" onClick={() => handleRegist()}>Sign Up</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header