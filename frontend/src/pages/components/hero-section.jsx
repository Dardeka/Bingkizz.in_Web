// Import Carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

function HeroSection(){
    return(
        <div id="HERO" className="flex mt-22 content-center w-full">
            <Carousel plugins={[
                Autoplay({
                    delay: 3000,
                })
            ]}>
                <CarouselContent className="w-full">
                    <CarouselItem><img src="/carousel/Carousel-1.png" alt="" /></CarouselItem>
                    <CarouselItem><img src="/carousel/Carousel-2.png" alt="" /></CarouselItem>
                    <CarouselItem><img src="/carousel/Carousel-3.png" alt="" /></CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default HeroSection