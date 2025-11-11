import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import Header from "./components/header"
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";

function LoginPage(){
    const navigate = useNavigate()

    const handleRegist = () => {
        navigate("/register")
    }

    const handleDashboard =() => {
        navigate("/")
    }

    const handleAdminDashboard =() => {
        navigate("/admin")
    }

    const initVal = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min(8).max(20).required(),
    })

    const submit = (data) => {
        axios.post("http://localhost:3001/api/login", data).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }else{
                // console.log("ini adalah hasil : ",response.data)
                // sessionStorage.setItem("accessToken", response.data)
                sessionStorage.setItem("accessToken", response.data)
                // sessionStorage.setItem("userId", response.data.id)
                handleDashboard()
            }

            // alert("Login Successfully! \n Discover more sweetness with Bingkizz.in!")
        });
    }

    return(
        <div className="static top-0 left-0 mt-10 bg-[url(/images/Background.png)] w-screen">
            <Header/>
            <div className="flex flex-row top-0">
                <img src="/images/loginImg.png" alt="" />
                <div className="flex flex-col mt-20 ml-[80px]">
                    <p className="flex text-2xl font-bold items-start">Login</p>
                    <hr />
                    <Formik initialValues={initVal} onSubmit={submit} validationSchema={validationSchema}>
                        <Form className="flex flex-col items-start mt-[26px]">
                            <label>Username</label>
                            <Field autocomplete="off" id="username" name="username" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"></Field>
                            <ErrorMessage name="username" component="span"/>

                            <label className="mt-[10px]">Password</label>
                            <Field autocomplete="off" id="password" type="password" name="password" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] px-[12px] outline-none"></Field>
                            <ErrorMessage name="password" component="span"/>
                            
                            <Button type="submit" className="!bg-[#F4476D] mt-[50px] !w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20" >LOGIN</Button>

                            <div className="flex flex-col justify-center mx-auto mt-[26px]">
                                <p className='mb-10'>or Sign In with</p>
                                <GoogleOAuthProvider clientId="813358833309-obghdeqdsbc8s3gtm3r0bbshgaeonne1.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            const googleToken = credentialResponse.credential;

                                            console.log(credentialResponse);
                                            axios.post("http://localhost:3001/auth/google", {token: googleToken}).then((response) => {
                                                if (response.data && response.data.accessToken) {
                                                    sessionStorage.setItem("accessToken", response.data.accessToken);
                                                    handleDashboard();
                                                } else {
                                                    // Jika server tidak mengembalikan accessToken
                                                    alert("Login Google berhasil, tetapi server tidak memberikan token akses.");
                                                }

                                                // alert("Login Successfully! \n Discover more sweetness with Bingkizz.in!")
                                            });
                                            // kirim credentialResponse.credential ke backend kalau mau verifikasi
                                        }}
                                        onError={() => {
                                        console.log('Login Failed');
                                        }}
                                    />
                                </GoogleOAuthProvider>
                                <p className="mt-[35px]">New Here? <a onClick={() => handleRegist()}>Create new account</a></p>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default LoginPage