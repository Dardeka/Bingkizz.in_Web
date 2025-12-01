import { useNavigate } from "react-router-dom";
import Header from "./components/header"
// import pinky from "../assets/pinky.png"
// import blueming from "../assets/blueming.png"
import "../index.css"
// import "./ProductPage.css" // Hapus impor file CSS
import React, { useState, useRef, useEffect } from 'react';

function ProductPage(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        setFetchError(null);
        try {
            // Ganti URL jika endpoint Anda berbeda
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/show-products`); 
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            
            const formattedProducts = data.map(item => ({
                id: item._id,
                name: item.productName,
                stock: item.productStock,
                price: item.productPrice,
                image: item.productImg
            }));

            console.log("Fetched products:", formattedProducts);
            
            setProducts(formattedProducts);
        } catch (error) {
            setFetchError(error.message);
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const navigate = useNavigate();

    const handleSeeDetail = (id) => {
        navigate(`/detail-product/${id}`);
    }
    return(
        <div>
            <Header />
            <div className="pt-[120px] justify-items-center content-center ml-[100px] mr-[100px]">
                <div className="text-center text-3xl font-bold mb-[30px] text-[#e03636]">All Products</div>
                <div class="grid grid-cols-4 gap-4">
                    {products.map(product => (
                        <div key={product.id} className="w-[250px] h-auto py-5 bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px] hover:shadow-xl/30">
                            <div className="w-[200px] h-[200px] bg-gray-400 rounded-lg">
                                <img src={`${product.image}`} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <div className="mt-[15px] text-lg font-bold text-[#e03636] mx-[10px]">{product.name}</div>
                            <button className="!w-[200px] h-10 mt-[10px] !bg-[#e03636] border-none rounded-[8px] text-white cursor-pointer hover:!bg-[#f16363]" onClick={() => handleSeeDetail(product.id)}>See Detail</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductPage