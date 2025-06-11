// import Cards from "@/components/AnimatedHorizontalCards/HorizontalCards";
// import Image from "next/image";
import BannerAnimation from "@/components/Home/BannerAnimation";
import DestinationCards from "@/components/DestinationsView/DestinationCards";
import Image from "next/image";

export default function Home() {


  const Destinations = [
    {
      image: '/images/places/sea.png',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscinge lit Pellentesque ut ligula vitae",
      place: 'United Arab Emirates',
      category: 'Adventure & Exploration',
      price: 34,
      days: 6,

    },
    {
      image: '/images/places/sea.png',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscinge lit Pellentesque ut ligula vitae",
      place: 'United Arab Emirates',
      category: 'Adventure & Exploration',
      price: 34,
      days: 6,

    },
    {
      image: '/images/places/sea.png',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscinge lit Pellentesque ut ligula vitae",
      place: 'United Arab Emirates',
      category: 'Adventure & Exploration',
      price: 34,
      days: 6,

    },
    {
      image: '/images/places/sea.png',
      description: "Lorem ipsum dolor sit amet, consectetur adipiscinge lit Pellentesque ut ligula vitae",
      place: 'United Arab Emirates',
      category: 'Adventure & Exploration',
      price: 34,
      days: 6,

    },
  ]


  return (
    <div className=''>

      <BannerAnimation />

      <div className=" w-full relative flex justify-center -mt-10  items-center  ">

        <Image
          src="/images/home/greyscale-mountain.png"
          alt="Background"
          fill
          className="object-cover  -z-10" // -z-10 sends it behind other content
          quality={100}
          priority
        />
        <div className=" absolute inset-0 w-full h-full  bg-white/50 ">
        </div>


        <div className="grid 2xl:gap-28 z-0 xl:gap-16 my-36 md:gap-12 gap-5   md:grid-cols-2   w-10/12  " style={{ width: 'fit-content' }}>

          <DestinationCards Destinations={Destinations} />

        </div>

      </div>



    </div>

  );
}
