import Header from "./components/header"
import pinky from "../assets/pinky.png"
import blueming from "../assets/blueming.png"
import "../index.css"
// import "./ProductPage.css" // Hapus impor file CSS

function ProductPage(){
    return(
        <div>
            <Header />
            
            <div className="pt-[120px] justify-items-center content-center ml-[100px]">
                <div className="text-center text-3xl font-bold mb-[30px] text-[#e03636]">All Products</div>
                <div class="grid grid-cols-4 gap-4">
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">
                        <div className="w-[200px] h-[200px] bg-gray-400 rounded-lg">
                        <img src={pinky} alt="pinky hampers" className="w-full h-full object-cover rounded-lg" />  
                        </div>
                        <div className="mt-[15px] text-lg font-bold text-[#e03636]">Pinky Hampers Snack</div>
                        <button className="w-[150px] h-10 mt-[10px] bg-red-500 text-white border-none rounded-[8px] text-white cursor-pointer pt-[3%] hover:bg-[#f16363]">Add to cart</button>
                    </div>
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">
                        <div className="w-[200px] h-[200px] bg-gray-400 rounded-lg">
                            <img src={blueming} alt="blueming hampers" className="w-full h-full object-cover rounded-lg"/>
                        </div>
                        <div className="mt-[15px] text-lg font-bold text-[#e03636]">Blueming Hampers Snack</div>
                        <button className="w-[150px] h-10 mt-[10px] bg-[#e03636] border-none rounded-[8px] text-white cursor-pointer pt-[3%] hover:bg-[#f16363]">Add to cart</button>
                    </div>
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">03</div>
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">04</div>
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">05</div>
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">06</div>
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">07</div>
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">08</div>
                    <div className="w-[250px] h-[350px] bg-white border border-[#e03636] flex flex-col items-center justify-center rounded-[10px]">09</div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage