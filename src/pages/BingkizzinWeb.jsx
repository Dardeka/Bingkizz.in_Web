import Header from "./components/header"
import HeroSection from "./components/hero-section"
import Products from "./components/products"



function BingkizzinWeb(){
    return(
        <div className="static top-0 h-[1920px] max-w-screen left-0 bg-[url(/public/images/background.png)]">
            <Header/>
            <HeroSection/>
            <Products/>
        </div>
    )
}

export default BingkizzinWeb