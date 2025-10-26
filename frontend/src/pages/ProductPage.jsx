import Header from "./components/header"
import "./ProductPage.css"

function ProductPage(){
    return(
        <div>
            <Header />
            
            <div className="GridProduct">
                <div className="judul">All Products</div>
                <div class="grid grid-cols-4 gap-4">
                    <div className="Product">
                        <div className="imgProduct"></div>
                        <div className="namaProduct">Pinky Hampers Snack</div>
                        <button className="pinky">Add to cart</button>
                    </div>
                    <div className="Product">
                        <div className="imgProduct"></div>
                        <div className="namaProduct">Blueming Hampers Snack</div>
                        <button className="blueming">Add to cart</button>
                    </div>
                    <div className="Product">03</div>
                    <div className="Product">04</div>
                    <div className="Product">05</div>
                    <div className="Product">06</div>
                    <div className="Product">07</div>
                    <div className="Product">08</div>
                    <div className="Product">09</div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage