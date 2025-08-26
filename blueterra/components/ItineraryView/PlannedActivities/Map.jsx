'use client'
import dynamic from 'next/dynamic';

// const MapClient = dynamic(() => import('./Leaflet'), {
//     ssr: false,
// });


const MapClient = dynamic(() => import('./MapDemo'), {
    ssr: false,
});

export default function Map({expandCards,index, itineraryData}) {
    

    return (
        // <div onClick={()=>expandCards(index)} className=" relative rounded-sm  overflow-hidden cursor-pointer w-full h-full">
        <div  className=" relative rounded-sm  overflow-hidden cursor-pointer w-full h-full">

           
            <MapClient expandCards={expandCards} itineraryData={itineraryData}/>
        </div>
       
    )
}