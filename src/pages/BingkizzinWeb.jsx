import { Button } from "../components/ui/button"
import Footer from "./components/footer"
import Header from "./components/header"
import HeroSection from "./components/hero-section"
import Products from "./components/products"

function BingkizzinWeb(){
    return(
        <div className="flex flex-col w-full min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat">
            <Header/>
            <main className="flex-grow">
                <HeroSection/>
                <Products/>
            </main>
            <Footer/>
        </div>
    )
}

export default BingkizzinWeb