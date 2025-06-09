import Cards from "@/components/AnimatedCards/Cards";

export default function Home() {

  const CardData = [
    {title:'1', color : '#219ebc', image : '/images/home/girl-and-boy-vr.jpg', shrinkImage : '/images/home/men-in-yellow-dress.png'},
    {title:'2', color : '#d6ccc2', image : '/images/home/girl-in-yellow-dress-jumbing.png', shrinkImage : '/images/home/men-in-yellow-dress.png'},
    {title:'3', color : '#83c5be', image : '/images/home/men-climbing-mountain.png', shrinkImage : '/images/home/men-in-yellow-dress.png'},
    {title:'4', color : '#95d5b2', image : '/images/home/men-in-yellow-dress.png', shrinkImage : '/images/home/men-in-yellow-dress.png'},
    {title:'5', color : '#cad2c5', image : '/images/home/old-man.jpeg', shrinkImage : '/images/home/men-in-yellow-dress.png'},
    {title:'6', color : '#d6ccc2', image : '/images/home/yellow-man-second.png', shrinkImage : '/images/home/men-in-yellow-dress.png'},


  ]
  return (
    <div className=''>
      {/* <h1 className="text-3xl font-bold underline">
        Home page
      </h1> */}
      <div className="w-full h-full ">
        <Cards CardDetails={CardData}/>
      </div>
  
    </div>
  );
}
