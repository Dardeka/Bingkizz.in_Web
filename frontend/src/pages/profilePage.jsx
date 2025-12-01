import Header from "./components/header";
import { Button } from "../components/ui/button";

import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom";


function ProfilePage() {
    const [userData, setUserData] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    const handleHistory = () => {
        navigate("/order-history");
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

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        setAccessToken(token);

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

        const decodedToken = decodeJWT(token);
        
        const getUserData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${decodedToken.id}`, {
                    method: 'GET',
                    headers: {
                        accessToken: token,
                    },
                })

                if (!response.ok) {
                    console.log({error: error.message})
                }

                const data = await response.json();
                setUserName(data.username);
                setName(data.name);
                setAddress(data.address);
                setPhoneNumber(data.phoneNum);
                
                const formattedData = [{
                    username: data.username,
                    name: data.name,
                    address: data.address,
                    phoneNum: data.phoneNum,
                    profilePic: data.profilePic,
                }];

                setUserData(formattedData);
                console.log("User Details: ", formattedData)
                console.log("User Data: ", data);
            } catch (error) {
                console.log("This error : ",{error: error.message})
            }
        }
        getUserData();
    }, []);

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        const limit = 2000
        const size = file.size / 1024
        if(size > limit){
            alert("Ukuran file terlalu besar! Maksimal 2MB.")
            return false
        }else{
            if(file){
                const fileURL = URL.createObjectURL(file);
                setProfilePicPreview(fileURL);
                // console.log("This is the file: ", file);
                setProfilePicture(file);
            }
        }

    }

    const initialVal = {
        username: userName,
        name: name,
        address: address,
        phoneNum: phoneNumber,
        profilePic: profilePicture || null,
    }

    const submitData = (values) => {
        const payload = decodeJWT(accessToken);
        const userId = payload.id

        const fd = new FormData();
        fd.append('userId', userId);
        fd.append('name', values.name);
        fd.append('address', values.address);
        fd.append('phoneNum', values.phoneNum);
        if(values.profilePic instanceof File){
            fd.append('profilePic', values.profilePic);
        }

        console.log("Image path: ", values.profilePic);
        const response = fetch(`${import.meta.env.VITE_BACKEND_URL}/api/update`, {
            method: 'PUT',
            body: fd,
        })

        console.log("Update response: ", response);
        navigate('/profile');   
    }

    return (
        <div className="w-screen h-screen top-0 left-0 right-0 font-montserrat bg-cover pt-[115px] bg-[url(/images/Background.png)]">
            <Header/>
            {/* Start user profile section */}
            <div className="w-[1110px] h-[540px] bg-[#F1DFE4] flex flex-row mx-auto pt-[37px] pl-[33px] pr-[65px] shadow-xl/20">
                <div className="h-[450px] flex flex-col items-center pr-[40px] border-r-2 border-black/10">
                    <h3 className="font-bold">User Profile</h3>
                    <div className="flex flex-col mt-[27px] gap-[20px]">
                        <Button className="!bg-gray-300 !text-black !w-[150px] cursor-pointer hover:!bg-gray-300 hover:shadow-xl/10" onClick={() => navigate('/profile')}>User Info</Button>
                        <Button className="!bg-transparent !text-black !w-[150px] cursor-pointer hover:!bg-gray-300 hover:shadow-xl/10" onClick={handleHistory}>Order History</Button>
                    </div>
                </div>
                {userData.map((user) => (
                    <div className="flex flex-col mt-[30px] ml-[50px] gap-[20px]" key={user.username}>
                        <img src={`${user.profilePic}`} alt={user.profilePic} width="120px" height="120px" className="rounded-full"/>
                        <div className="w-[500px] flex flex-col mt-[30px] text-left gap-[15px]">
                            <div className="flex flex-row gap-[73px]">
                                <b>Username :</b>
                                <h2 htmlFor="">{user.username}</h2>
                            </div>
                            <div className="flex flex-row gap-[110px]">
                                <b>Name :</b>
                                <h2 htmlFor="">{user.name}</h2>
                            </div>
                            <div className="flex flex-row gap-[90px]">
                                <b>Address :</b>
                                <h2 htmlFor="">{user.address}</h2>
                            </div>
                            <div className="flex flex-row gap-[30px]">
                                <b>Phone Number :</b>
                                <h2 htmlFor="">{user.phoneNum}</h2>
                            </div>
                        </div>
                    </div>
                ))}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="ml-auto">Edit Profile</Button>
                    </DialogTrigger>
                    {/* Mengganti tag <form> dengan <Formik> dan merender <DialogContent> di dalamnya */}
                    <Formik
                        enableReinitialize
                        initialValues={initialVal}
                        onSubmit={submitData}
                    >
                        <DialogContent className="sm:max-w-4xl"> {/* Diperbesar agar sesuai dengan Form */}
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Formik Form */}
                        <Form className="flex flex-col mt-[50px] gap-[50px] ml-[60px] p-4">
                            <div className="flex flex-row">
                            <div className="flex flex-col">
                                <label>Upload Profile Picture</label>
                                <input
                                type="file"
                                id="profilePic"
                                name="profilePic"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-[220px] h-[30px] mt-[10px] bg-[#D9D9D9] rounded-[12px] p-1"
                                />
                                {profilePicPreview && (
                                <img
                                    src={profilePicPreview}
                                    alt="Profile Preview"
                                    className="w-[220px] h-[220px] rounded-[12px] object-cover mt-4"
                                />
                                )}
                            </div>
                            <div className="ml-[58px]">
                                <div className="text-start mb-[13px] flex flex-col">
                                <label>Username</label>
                                <Field
                                    autocomplete="off"
                                    id="username"
                                    name="username"
                                    className="w-[409px] h-[35px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"
                                />
                                <ErrorMessage name="username" component="span" className="text-red-500 text-sm" />
                                </div>
                                <div className="text-start mb-[13px] flex flex-col">
                                <label className="mt-[10px]">Name</label>
                                <Field
                                    autocomplete="off"
                                    id="name"
                                    name="name"
                                    className="w-[409px] h-[35px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"
                                />
                                <ErrorMessage name="name" component="span" className="text-red-500 text-sm" />
                                </div>
                                <div className="text-start mb-[13px] flex flex-col">
                                <label className="mt-[10px]">Address</label>
                                <Field
                                    autocomplete="off"
                                    id="address"
                                    name="address"
                                    className="w-[409px] h-[35px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"
                                />
                                <ErrorMessage name="address" component="span" className="text-red-500 text-sm" />
                                </div>
                                <div className="text-start mb-[13px] flex flex-col">
                                <label className="mt-[10px]">Phone Number</label>
                                <Field
                                    autocomplete="off"
                                    id="phoneNum"
                                    name="phoneNum"
                                    className="w-[409px] h-[35px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"
                                />
                                <ErrorMessage name="phoneNum" component="span" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            </div>

                            <DialogFooter className="mt-4">
                            <DialogClose asChild>
                                <Button variant="outline" type="button">
                                Cancel
                                </Button>
                            </DialogClose>
                            {/* Tombol submit Formik */}
                            <Button type="submit" className="!bg-[#F4476D] cursor-pointer hover:!bg-[#D1345B] hover:shadow-xl/10" onClick={() => {navigate('/profile')}}>
                                Save Info
                            </Button>
                            </DialogFooter>
                        </Form>
                        </DialogContent>
                    </Formik>
                    </Dialog>
            </div>
        </div>
    )
}

export default ProfilePage;