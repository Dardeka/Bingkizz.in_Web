import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Header from "./components/header";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import axios from "axios";

function RegistPage() {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }

    const initVal = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().min(8).max(10).required(),
        confirmPass: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'), 
    })

    const submit = (data) => {
        axios.post("http://localhost:3001/auth/regist", data).then((response) => {
            console.log(response.data);
            if(response.data == "SUCCESS"){
                alert("Thank You for Register!\n Let's Login to Your Account")
                handleLogin()
            } 
        });
    }

    return(
        <div className="static top-0 left-0 mt-10 bg-[url(/images/Background.png)] w-screen">
            <Header/>
            <div className="flex flex-row top-0">
                <img src="/images/registImg.png" alt="" />
                <div className="flex flex-col mt-20 ml-[80px]">
                    <p className="flex text-2xl font-bold items-start">Register</p>
                    <hr />
                    <Formik initialValues={initVal} onSubmit={submit} validationSchema={validationSchema}>
                        <Form className="flex flex-col items-start mt-[26px]">
                            <label>Username</label>
                            <Field autocomplete="off" id="username" name="username" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"></Field>
                            <ErrorMessage name="username" component="span"/>
                            <label className="mt-[10px]">Email</label>
                            <Field autocomplete="off" id="email" type="email" name="email" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] pl-[12px] outline-none"></Field>
                            <ErrorMessage name="email" component="span"/>
                            <label className="mt-[10px]">Password</label>
                            <Field autocomplete="off" id="password" type="password" name="password" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] px-[12px] outline-none"></Field>
                            <ErrorMessage name="password" component="span"/>
                            <label className="mt-[10px]">Confirm Password</label>
                            <Field autocomplete="off" name="confirmPass" id="confirmPass" type="password" className="w-[409px] h-[47px] bg-[#D9D9D9] shadow-xl/20 rounded-[12px] px-[12px] outline-none"></Field>
                            <ErrorMessage name="confirmPass" component="span"/>
                            <Button type="submit" className="!bg-[#F4476D] mt-[59px] w-[409px] h-[47px] shadow-xl/20 outline-none hover:!bg-[#CF2248] hover:shadow-xl/30" >REGISTER</Button>
                        </Form>
                    </Formik>
                    <p className="mt-[35px]">Already have account? <a onClick={() => handleLogin()}>Sign In</a></p>
                </div>
            </div>
        </div>
    )
}

export default RegistPage