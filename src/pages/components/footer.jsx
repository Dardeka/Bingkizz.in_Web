import { Button } from "../../components/ui/button"

function Footer(){
    return(
        <div className="">
            <footer className="flex flex-col items-center justify-center mt-10 h-[170px] w-full bg-[#9f152f] text-white">
                <h2 className="font-bold">Find us on :</h2>
                <div className="flex flex-row gap-3 mt-2">
                <Button className="!bg-transparent">Instagram</Button>
                <Button className="!bg-transparent">Twitter</Button>
                <Button className="!bg-transparent">Facebook</Button>
                <Button className="!bg-transparent">Shopee</Button>
                </div>
                <h3 className="mt-2">Bingkizz.in @ 2025</h3>
            </footer>
        </div>
    )
}

export default Footer