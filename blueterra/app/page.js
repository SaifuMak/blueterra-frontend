import Cards from "@/components/AnimatedCards/Cards";

export default function Home() {

  const CardData = [
    {number:'01', image : '/images/home/girl-in-yellow-dress-jumbing.png',tagline : 'Signature Journeys'},
    {number:'02',  image : '/images/home/men-climbing-mountain.png',tagline : 'Explore by Landscape'},
    {number:'03',  image : '/images/home/girl-and-boy-vr.jpg',tagline : 'Adventures in Motion' },
    {number:'04', image : '/images/home/men-in-yellow-dress.png',tagline : 'Mindful Escapes'},
    {number:'05', image : '/images/home/old-man.jpeg',tagline : 'Unforgettable Editions'},
    {number:'06', image : '/images/home/yellow-man-second.png',tagline : 'Tailored for You'},

  ]
  return (
    <div className=' h-screen '>
      {/* <h1 className="text-3xl font-bold underline">
        Home page
      </h1> */}
      <div className="w-full h-screen ">
        <Cards CardDetails={CardData}/>
      </div>
  
    </div>
  );
}
