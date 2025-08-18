import React,{useRef} from 'react'
import Dropdown from './DropDown';
import ReorderIcons from '../ReorderIcons';
import TravelModeDropDown from './TravelModeDropDown';

const MapRoutingSection = ({handleReorder,transferOptions,mapRouting,setMapRouting,inputStyle,onToggle}) => {

    const mapRoutingRef = useRef([]);

     const handleAddMapRouting = () => {
        const lastIndex = mapRouting.length;
        setMapRouting([...mapRouting, { location: '', coordinates: '', transfer: '' }]);
        setTimeout(() => {
            mapRoutingRef.current[lastIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    };


     const handleMapRoutingChange = (index, field, value) => {
        const updated = [...mapRouting];
        updated[index][field] = value;
        setMapRouting(updated);
    };


     const handleDeleteMapRouting = (indexToDelete) => {
        const previousIndex = indexToDelete - 1;
        setMapRouting((prev) => prev.filter((_, index) => index !== indexToDelete));

        if (previousIndex >= 0) {
            setTimeout(() => {
                const target = mapRoutingRef.current[previousIndex];
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 100);
        }
    };


    return (
        <div className="flex flex-col xl:w-7/12 transition-all duration-300  ease-in-out">
            <div className="flex items-center space-x-8">
                <h2 className="text-xl text-dark-blue font-medium">Map Routing</h2>
                <img
                    onClick={handleAddMapRouting}
                    src="/Icons/sqaure-add-icon.svg"
                    alt=""
                    className="cursor-pointer size-7"
                />
            </div>

            {mapRouting.map((data, index) => (
                <div
                    key={index}
                    ref={(el) => (mapRoutingRef.current[index] = el)}
                    className=" relative flex flex-col"
                >
                    <div className="w-full flex flex-col space-y-4 mt-6">

                        <div className="flex space-x-5 ">
                            <input
                                type="text"
                                value={data.location}
                                onChange={(e) => handleMapRoutingChange(index, 'location', e.target.value)}
                                placeholder="Location.."
                                className={inputStyle}
                                required
                            />
                            <input
                                type="text"
                                value={data.coordinates}
                                onChange={(e) => handleMapRoutingChange(index, 'coordinates', e.target.value)}
                                placeholder="Coordinates.."
                                className={inputStyle}
                                required
                            />

                        </div>

                        <div className={`${mapRouting?.length -1 === index ? 'opacity-0 pointer-events-none' : 'opacity-100'} mt-2`}>
                            <TravelModeDropDown
                                value={data.transfer}
                                onChange={(val) => handleMapRoutingChange(index, "transfer", val)}
                                options={transferOptions}
                                placeholder="Transfer Type"
                                onToggle={onToggle}

                            />
                        </div>

                    </div>

                    <div className="absolute flex items-center space-x-3 -right-16 top-8">
                        <ReorderIcons
                            handleReorder={handleReorder}
                            index={index}
                            handleDelete={handleDeleteMapRouting}
                            arrayOfElements={mapRouting}
                            setElements={setMapRouting}
                            isReorder={false}
                        />
                    </div>
                </div>
            ))}
        </div>

    )
}

export default MapRoutingSection