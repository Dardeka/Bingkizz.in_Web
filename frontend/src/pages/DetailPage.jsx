import { Button } from "../components/ui/button"
import Footer from "./components/footer";
import Header from "./components/header"
import { FaCartPlus } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage(){
    const { id } = useParams();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchProductDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                // Ganti URL ini dengan endpoint API Anda untuk mengambil detail produk
                const response = await fetch(`http://localhost:3001/products/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Produk dengan ID ${id} tidak ditemukan.`);
                }
                
                const data = await response.json();
                console.log(data);
                
                // Asumsi data yang di-return dari backend sudah berbentuk detail produk
                setProduct(data); 

            } catch (err) {
                setError(err.message);
                console.error("Error fetching product detail:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]); // Dependensi [id] memastikan fetch hanya berjalan saat ID berubah

    if (loading) {
        return <div className="text-center pt-32">Memuat detail produk...</div>;
    }

    if (error) {
        return <div className="text-center pt-32 text-red-500">Error: {error}</div>;
    }
    
    if (!product) {
        return <div className="text-center pt-32">Data produk tidak tersedia.</div>;
    }

    return(
        <div className="flex flex-col w-screen min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat">
            <Header/>
            <div className="flex flex-row w-[1196px] h-[495px] mt-30 ml-auto mr-auto bg-[#9F152F] p-5 rounded-[12px]">
                <img src={`http://localhost:3001${product.productImage}`} alt="" width="413px" height="313px" />
                <div className="flex flex-col text-white ml-[80px] w-full mr-[45px]">
                    <div className="flex flex-col items-start">
                        <p className="text-[32px] font-bold">{product.productName}</p>
                        <p className="w-[484px] text-start text-xl mt-[43px]">{product.productDesc}</p>
                        <p className="text-xl mt-[27px]"><b>Tersedia :</b> {product.productStock}</p>
                    </div>
                    <div className="flex flex-row w-[150px] h-[40px] bg-[#B87B7B] mt-[39px] items-center justify-between rounded-[6px] items-start">
                        <Button className="!bg-transparent">-</Button>
                        <p className="text-black bg-white w-[50px] h-[40px] content-center">1</p>
                        <Button className="!bg-transparent">+</Button>
                    </div>
                    <div className="flex mt-[25px] justify-end">
                        <Button className="!bg-[#00FF62] !text-black w-[180px]"><FaCartPlus /> Add to Cart</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default DetailPage