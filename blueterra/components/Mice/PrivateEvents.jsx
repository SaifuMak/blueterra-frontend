import React from 'react'
import Events from '../Journey/Events'
import InfoCards from './InfoCards'
import ResponsiveClipPath from '../generalComponents/ResponsiveClipPath'

function PrivateEvents({PRIVATE_EVENTS}) {
    return (
        <div className=" w-full mt-16  overflow-hidden text-dark-28 flex flex-col items-center h-full relative ">

            <Events firstTitle='Private Events & Occasions'
                description='Because Life’s Most Precious Moments Deserve Thoughtful Excellence'
                firstPara='Beyond boardrooms and ballrooms, we also curate intimate celebrations, destination weddings, milestone anniversaries and luxury private gatherings - All executed with the same elite precision and soul-stirring flair'
                secondPara=''
                imageUrl='/images/corporate/food.png' />

            <div className=" w-10/12  2xl:mb-20 mb-10  z-20  mt-12 2xl:mt-20 text-dark-28 h-fit grid grid-cols-1 lg:grid-cols-3 gap-10">
                {PRIVATE_EVENTS?.map((data, index) => (
                    <InfoCards key={index} data={data} />
                ))}
            </div>
            <ResponsiveClipPath
                outerClass='absolute w-[29%] left-0  h-fit'
                ImagePath='/images/corporate/patterns/private-events-left.png'
                width={600}
            />

        </div>
    )
}

export default PrivateEvents