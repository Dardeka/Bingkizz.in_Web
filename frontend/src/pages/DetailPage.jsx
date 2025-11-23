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
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchCertainProductDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/show-products/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Produk dengan ID ${id} tidak ditemukan.`);
                }
                
                const data = await response.json();
                console.log(data);
                
                setProduct(data); 

            } catch (err) {
                setError(err.message);
                console.error("Error fetching product detail:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCertainProductDetail();
    }, [id]); 

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/show-products`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.statusText}`);
                }
                const data = await response.json();
                console.log(data);
                setAllProducts(data);
            } catch (error) {
                console.log({error: error.message} );
            }
        }

        fetchAllProducts();
    }, []);

    // Handle add cart
    const handleAddToCart = async () => {
        if(quantity <= 0) {
            alert("Masukkan minimal 1 produk untuk ditambahkan ke keranjang.");
        }else{

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
                    const userId = payload.id;
                    console.log("User ID:", userId);
                }
    
                if (!userToken) {
                    throw new Error("Anda harus login untuk menambahkan produk ke keranjang.");
                }
    
                const responseCart = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/init-cart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': userToken,
                    },
                    body: JSON.stringify({
                        userId: payload.id,
                        cartItems:[{
                            productId: product._id,
                            quantity: quantity
                        }],
                        totalPrice: product.productPrice * quantity
                    }),
                });
    
                if (!responseCart.ok) {
                    const errorData = await responseCart.json();
                    throw new Error(errorData.message || `Gagal menambahkan produk ke keranjang.`);
                }
    
                alert('Produk berhasil ditambahkan ke keranjang!');     
                navigate('/cart');
            } catch (err) {
                setError(err.message);
                console.error("Error adding product to cart:", err);
            } finally {
                setIsAdding(false);
            }
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
        <div className="flex flex-col w-screen min-h-screen bg-[#F1DFE4] bg-cover bg-no-repeat font-montserrat">
            <Header/>
            <div className="flex flex-row w-[1196px] h-[495px] mt-30 ml-auto mr-auto p-5 mb-[30px]">
                <img src={`${product.productImg}`} alt="" width="413px" height="313px" />
                <div className="flex flex-col text-black ml-[80px] w-full mr-[45px]">
                    <div className="flex flex-col items-start">
                        <p className="text-2xl text-left font-bold">{product.productName}</p>
                        <p className="text-xl mt-4">Rp. {product.productPrice}</p>
                        <p className="w-[600px] text-justify text-sm mt-[23px]">{product.productDesc}</p>
                        <p className="text-xl mt-[27px]"><b>Tersedia :</b> {product.productStock}</p>
                    </div>
                    <div className="flex flex-row justify-between items-center mt-[29px]">
                        <div className="flex flex-row w-[150px] h-[40px] bg-[#B87B7B] items-center justify-between rounded-[6px] items-start shadow-lg/20">
                            <Button className="!bg-transparent" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</Button>
                            <p className="text-black bg-white w-[50px] h-[40px] content-center">{quantity}</p>
                            <Button className="!bg-transparent" onClick={() => handleQuantityChange(1)}>+</Button>
                        </div>
                        <div className="flex justify-end">
                            <Button className="!bg-[#00FF62] !text-black w-[180px] font-bold shadow-xl/10 hover:shadow-xl/30" onClick={handleAddToCart} disabled={isAdding}><FaCartPlus /> Tambah ke Keranjang</Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Review Section */}
            <div className="flex flex-row mt-[15px] ml-[60px] mb-[40px]">
                <div className="w-[175px] flex flex-col items-start">
                    <img src="/Icons/quote.png" alt="" width="80px" />
                    <br />
                    <h1 className="text-left font-semibold ml-[10px]">Apa pendapat mereka mengenai produk kami?</h1>
                </div>
                <div className="flex flex-col justify-between w-[250px] h-[350px] ml-[51px] mt-[20px] mb-[40px] bg-white p-5 text-left rounded-[12px] shadow-xl/40">
                    <p>" hampersnya sesuai sama yang di foto, hiasannya juga cantik bgt, cocok buat yg mau ngasih surprise "</p>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-semibold">p*****3</h2>
                        <img src="/Icons/shopee-icon.png" alt="" width="30px" height="30px"/>
                    </div>
                </div>
            </div>
            {/* Other products */}
            <div className="ml-[60px]">
                <h1 className="text-left font-semibold">Produk lainnya dari Bingkizz.In :</h1>
                <br />
                <div className="flex flex-row gap-5">
                    {/* Card */}
                    {allProducts.filter(prod => prod._id != product._id).map((prod) => (
                    <div key={prod.id} className="w-[250px] bg-white p-5 rounded-[12px] shadow-xl/30">
                        <img src={prod.productImg} alt={prod.productName} width="200px" height="200px" />
                        <br />
                        <h3>{prod.productName}</h3>
                        <br />
                        <div className="flex flex-row gap-5 items-center justify-between">
                            <p>Rp {prod.productPrice}</p>
                            <Button className="!bg-[#e03636] !text-white w-[100px] font-bold">Lihat Detail</Button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default DetailPage