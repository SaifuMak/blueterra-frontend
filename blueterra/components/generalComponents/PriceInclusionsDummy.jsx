import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const priceIncludes = [
    { text: "Internal flights", note: "(as detailed)" },
    { text: "Transfers", note: "(as detailed)" },
    { text: "Activities and excursions", note: "(as detailed)" },
    { text: "Accommodation and meals indicated", note: "(as detailed)" },
    { text: "24/7 Support whilst away", note: null },
];

const priceExcludes = [
    "Travel Insurance",
    "Visas",
    "Gratuities",
    "International flights",
];

export default function PriceInclusionsDummy() {
    return (
        <div className="w-full mx-auto px-4 py-8 ">
            <p className="mb-4 text-gray-800">As detailed in the itinerary:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">

                <div>
                    <h3 className=" font-medium text-lg mb-4">PRICE INCLUDES</h3>
                    <ul className="space-y-3">
                        {priceIncludes.map((item, idx) => (
                            <li
                                key={idx}
                                className={`flex ${item.note ? 'justify-between' : 'items-start gap-2'
                                    }`}
                            >
                                <div className="flex items-start gap-2">
                                    <FaCheckCircle className="text-green-600 mt-1" />
                                    <span>{item.text}</span>
                                </div>
                                {item.note && (
                                    <span className="text-gray-500 ml-3">{item.note}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4">PRICE EXCLUDES</h3>
                    <ul className="space-y-3">
                        {priceExcludes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                                <FaTimes className="text-red-600 mt-1" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
