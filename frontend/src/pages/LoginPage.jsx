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

    const initVal = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min(8).max(10).required(),
    })

    const submit = (data) => {
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }else{
                sessionStorage.setItem("accessToken", response.data)
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
                            
                            <Button type="submit" className="!bg-[#F4476D] mt-[50px] w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20" >LOGIN</Button>

                            <div className="flex flex-col justify-center mx-auto mt-[26px]">
                                <p>or Sign In with</p>
                                <Button className="!bg-[#FF7070] flex flex-row justify-center items-center mt-[26px] w-[200px] h-[47px] shadow-xl/20"><img src="/logo/icon_google.png" alt="" /> Google</Button>
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