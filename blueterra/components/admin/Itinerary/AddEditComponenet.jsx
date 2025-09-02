import React from 'react'

function AddEditComponenet({ fucntionToCall,
    title,
    labelOne,
    inputValue,
    inputPlaceholder,
    labelTwo,
    handleInput, 
    dropDownValu
}) {
    return (
        <>
            <form onSubmit={HandleAddCountry} className=" w-1/3 shrink-0">
                {/* container to add countries */}
                <div className=" flex flex-col items-center p-10 rounded-2xl bg-white border">
                    <h2 className="text-2xl text-center font-medium text-dark-28">Add</h2>

                    {/* Wrapper for inputs with consistent spacing */}
                    <div className="w-full mt-8 space-y-6">
                        <div>
                            <label htmlFor="text" className="font-medium">
                                Country Name
                            </label>
                            <input
                                type="text"
                                name="title"
                                onChange={(e) => setCountryTitle(e.target.value)}
                                value={countryTitle}
                                className="border mt-2 rounded-sm p-2 w-full outline-none"
                                placeholder="Country"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="text" className="font-medium">
                                Related Destination
                            </label>
                            <Dropdown
                                value={destination}
                                onChange={setDestination}
                                options={destinationOptions}
                                placeholder="Select Destination"
                                isOpen={isDestinationDropDownOpen}
                                onToggle={(isOpen) => setIsDestinationDropDownOpen(isOpen)}
                                className="w-full mt-2 border-stone-200"
                            />
                        </div>
                    </div>

                    <button type="submit" className="px-6 cursor-pointer py-1.5 mt-8 rounded-sm bg-sky-blue-dark text-white">
                        Save
                    </button>
                </div>
            </form></>
    )
}

export default AddEditComponenet