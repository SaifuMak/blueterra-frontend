import useGsapFadeIn from "@/app/hooks/Gsap/useGsapFadeIn"

export default function WhyTravelWithUsCard({ card, index = 0 }) {

    const cardRef = useGsapFadeIn(0, { initialPosition: 5, duration: 0.4, start: 'top 80%' })

    return (
        <div
            ref={cardRef}
            className="bg-[#F4FBFFE5] z-50 travel-card  text-dark-28 font-light lg:p-6 p-5 xl:p-7  2xl:p-10  space-y-2 xl:space-y-3 rounded-2xl shadow-md hover:shadow-lg transition"
        >
            <img src={card.icon} alt="" className=" size-9 object-cover" />
            <h3 className="2xl:text-[22px] text-lg lg:text-xl font-medium ">{card.title}</h3>
            <p className=" xl:pr-3 2xl:pr-10   xl:text-lg 2xl:text-xl  md:leading-7 lg:leading-8 2xl:leading-9  ">{card.description}</p>
        </div>

    )
}
