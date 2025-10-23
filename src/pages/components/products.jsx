import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function Products(){
    const navigate = useNavigate()

    const handleDetail = () => {
        navigate("/detail-product")
    }

    return(
        <div>
            {/* Our Products */}
            <div id="PRODUCT" className="content-center w-screen left-0 h-[70px] bg-[#9f152f]">
                <h2 className="text-white font-bold text-2xl" >Our Products</h2>
            </div>
            {/* Product Card */}
            <div className="flex flex-row mt-10 justify-evenly">
                {/* Blue */}
                <div class="w-[350px] h-[520px] border border-[#9f152f] rounded-lg overflow-hidden bg-white shadow">
                    <img
                        src="/products/varBlue.jpg"
                        alt="Card image"
                        class="w-[299px] h-[300px] ml-auto mr-auto mt-[25px] rounded-md object-cover"
                    />
                    <div class="text-center p-4">
                        <h4 class="text-[#9f152f] font-bold text-xl">Birthday Hampers - Blue Version</h4>
                        <p class="text-gray-700 mt-2">A sweet and aesthetic gift box, perfect for a memorable birthday surprise.</p>
                        <Button variant="destructive" className="mt-[10px] !bg-red-500 !text-white hover:!bg-red-600" onClick={() => {handleDetail()}}>See Detail</Button>
                    </div>
                </div>
               
                {/* Pink */}
                <div class="w-[350px] h-[520px] border border-[#9f152f] rounded-lg overflow-hidden bg-white shadow">
                    <img
                        src="/products/varPink.jpg"
                        alt="Card image"
                        class="w-[299px] h-[300px] ml-auto mr-auto mt-[25px] rounded-md object-cover"
                    />
                    <div class="text-center p-4">
                        <h4 class="text-[#9f152f] font-bold text-xl">Birthday Hampers - Pink Version</h4>
                        <p class="text-gray-700 mt-2">A sweet and aesthetic gift box, perfect for a memorable birthday surprise.</p>
                        <Button variant="destructive" className="mt-[10px] !bg-red-500 !text-white hover:!bg-red-600">See Detail</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products