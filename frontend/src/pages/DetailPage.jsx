import { Button } from "../components/ui/button"
import Footer from "./components/footer";
import Header from "./components/header"
import { FaCartPlus } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailPage(){
    const { id } = useParams();
    const navigate = useNavigate();


    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isAdding, setIsAdding] = useState(false);

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

    // Handle add cart
    const handleAddToCart = async () => {
        if(!product || isAdding) return;

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

        setIsAdding(true);
        setError(null);
        try {
            const userToken = sessionStorage.getItem('accessToken');
            const payload = decodeJWT(userToken);

            if (payload) {
                const userId = payload.id; // Mendapatkan ID pengguna dari payload
                console.log("User ID:", userId);
            }

            if (!userToken) {
                throw new Error("Anda harus login untuk menambahkan produk ke keranjang.");
            }

            const responseCart = await fetch(`http://localhost:3001/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accessToken': userToken,
                },
                body: JSON.stringify({
                    userId: payload.id,
                    productId: product.id,
                    quantity: quantity,
                }),
            });

            if (!responseCart.ok) {
                const errorData = await responseCart.json();
                throw new Error(errorData.message || `Gagal menambahkan produk ke keranjang.`);
            }

            alert('Produk berhasil ditambahkan ke keranjang!');
            navigate('/checkout/'+ payload.id);
        } catch (err) {
            setError(err.message);
            console.error("Error adding product to cart:", err);
        } finally {
            setIsAdding(false);
        }
            
    }

    if (loading) {
        return <div className="text-center pt-32">Memuat detail produk...</div>;
    }

    if (error) {
        return <div className="text-center pt-32 text-red-500">Error: {error}</div>;
    }
    
    if (!product) {
        return <div className="text-center pt-32">Data produk tidak tersedia.</div>;
    }

    // Fungsi untuk mengubah kuantitas
    const handleQuantityChange = (delta) => {
        setQuantity(prevQty => Math.max(1, prevQty + delta));
    };

    return(
        <div className="flex flex-col w-screen min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat">
            <Header/>
            <div className="flex flex-row w-[1196px] h-[495px] mt-30 ml-auto mr-auto bg-[#9F152F] p-5 rounded-[12px]">
                <img src={`http://localhost:3001${product.productImage}`} alt="" width="413px" height="313px" />
                <div className="flex flex-col text-white ml-[80px] w-full mr-[45px]">
                    <div className="flex flex-col items-start">
                        <p className="text-[32px] font-bold">{product.productName}</p>
                        <p className="text-[22px]">Rp. {product.productPrice}</p>
                        <p className="w-[484px] text-start text-xl mt-[43px]">{product.productDesc}</p>
                        <p className="text-xl mt-[27px]"><b>Tersedia :</b> {product.productStock}</p>
                    </div>
                    <div className="flex flex-row w-[150px] h-[40px] bg-[#B87B7B] mt-[39px] items-center justify-between rounded-[6px] items-start">
                        <Button className="!bg-transparent" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</Button>
                        <p className="text-black bg-white w-[50px] h-[40px] content-center">{quantity}</p>
                        <Button className="!bg-transparent" onClick={() => handleQuantityChange(1)}>+</Button>
                    </div>
                    <div className="flex mt-[25px] justify-end">
                        <Button className="!bg-[#00FF62] !text-black w-[180px]" onClick={handleAddToCart} disabled={isAdding}><FaCartPlus /> Add to Cart</Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default DetailPage