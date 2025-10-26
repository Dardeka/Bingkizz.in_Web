import { Button } from "../../components/ui/button"
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { SiShopee } from "react-icons/si";

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center mt-10 h-[170px] w-full bg-[#9f152f] text-white">
      <h2 className="font-bold">Find us on :</h2>

      <div className="flex flex-row mt-2 mb-2 space-x-2">
        <Button asChild className="!bg-transparent hover:!bg-white/10">
          <a
            href="https://www.instagram.com/bingkizz.in"
            target="_blank"
            rel="noopener noreferrer" className="!text-white"
          >
            <FaInstagram className="mr-1" /> Instagram
          </a>
        </Button>

        <Button asChild className="!bg-transparent hover:!bg-white/10">
          <a
            href="https://www.tiktok.com/@bingkizz.in"
            target="_blank"
            rel="noopener noreferrer"
            className="!text-white"
          >
            <FaTiktok className="mr-1" /> Tiktok
          </a>
        </Button>

        <Button asChild className="!bg-transparent hover:!bg-white/10">
          <a
            href="https://www.facebook.com/bingkizz.in"
            target="_blank"
            rel="noopener noreferrer"
            className="!text-white"
          >
            <FaFacebookSquare className="mr-1" /> Facebook
          </a>
        </Button>

        <Button asChild className="!bg-transparent hover:!bg-white/10">
          <a
            href="http://shopee.co.id/bingkizzin"
            target="_blank"
            rel="noopener noreferrer"
            className="!text-white"
          >
            <SiShopee className="mr-1" /> Shopee
          </a>
        </Button>
      </div>

      <h3 className="mt-2">Bingkizz.in @ 2025</h3>
    </footer>
  )
}

export default Footer