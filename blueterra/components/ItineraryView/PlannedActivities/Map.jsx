'use client'
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./Leaflet'), {
    ssr: false,
});

export default function Map({expandCards,index}) {
    

    return (
        <div onClick={()=>expandCards(index)} className=" relative  overflow-hidden cursor-pointer w-full h-full">
           
            <MapClient expandCards={expandCards}/>
        </div>
       
    )
}