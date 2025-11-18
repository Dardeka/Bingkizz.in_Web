import Footer from "./components/footer"
import Header from "./components/header"
import HeroSection from "./components/hero-section"
import Products from "./components/products"

function BingkizzinWeb(){
    return(
        <div className="flex flex-col w-screen min-h-screen bg-[url(/images/Background.png)] bg-cover bg-no-repeat font-montserrat">
            <Header/>
            <main className="flex-grow">
                <HeroSection/>
                <div className="flex flex-row w-full h-[100px] bg-[#9f152f] justify-center">
                    <h3 className="text-2xl text-white font-bold mt-auto mb-auto">What is Bingkizz.in?</h3>
                </div>
                <div className="flex flex-row w-full h-[158px] mt-[60px] justify-evenly">
                    <img src="/logo/logoNoBg.png" alt="" width="322px" height="123px" />
                    <p className="w-[567px] h-full text-left text-2xl">Bingkizz.in is a hampers and gift shop based in Jakarta. Our motto is <b>“Every Gift Has A Story”</b>, it means that every single gift has its story itself. So that, we’re here to give new sweet story and memories in each gifts.</p>
                </div>
                <div className="flex flex-col mt-[172px] h-[132px] items-center">
                    <p className="text-2xl font-bold mb-[20px]">Get ready to create more sweet stories and memories with </p>
                    <img src="/logo/red_logoTeksOnly.png" alt="" width="200px" />
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default BingkizzinWeb