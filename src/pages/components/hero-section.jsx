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
        <div id="HERO" className="flex mt-22 left-0 max-w-screen">
            <Carousel plugins={[
                Autoplay({
                    delay: 3000,
                })
            ]}>
                <CarouselContent className="max-w-screen">
                    <CarouselItem><img src="/carousel/Carousel-1.png" alt="" /></CarouselItem>
                    <CarouselItem><img src="/carousel/Carousel-2.png" alt="" /></CarouselItem>
                    <CarouselItem><img src="/carousel/Carousel-3.png" alt="" /></CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default HeroSection