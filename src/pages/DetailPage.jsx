import Header from "./components/header"

function DetailPage(){
    return(
        <div className="static top-0 h-[1920px] w-screen left-0 bg-[url(/public/images/background.png)]">
            <Header/>
            <div className="">
                <img src="/public/products/varBlue.jpg" alt="" width="400px" height="350px" />
                <div className="">
                    <h1></h1>
                </div>
            </div>
        </div>
    )
}

export default DetailPage