import React from 'react'
import ImageUploader from './ImageUploader'
import { useRef } from 'react';
import { IoIosStarOutline, IoIosStar, IoIosStarHalf } from '@/components/reactIcons'
import ReorderIcons from '../ReorderIcons';



function SignatureHighlights({ signatureHighlights, setSignatureHighlights, textAreaStyle, inputStyle, handleReorder }) {
    const signatureHighlightsRef = useRef([]);

    const handleAddSignatureHighlights = () => {
        const lastIndex = signatureHighlights.length;
        setSignatureHighlights([...signatureHighlights, { title: '' }])
        setTimeout(() => {
            const target = signatureHighlightsRef.current[lastIndex];
            target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 200);
    }

    const handleSignatureChange = (index, field, value) => {
        const updatedSignatureHighlights = [...signatureHighlights];
        updatedSignatureHighlights[index][field] = value;
        setSignatureHighlights(updatedSignatureHighlights);
    };

    const handleDeleteSignatureHighlights = (indexToDelete) => {

        const previousIndex = indexToDelete - 1
        setSignatureHighlights((prev) => prev.filter((_, index) => indexToDelete !== index))
        if (previousIndex > 0) {
            setTimeout(() => {
                const target = signatureHighlightsRef.current[previousIndex];
                target.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }

    return (
        <div className="flex flex-col  xl:w-3/12   transition-all duration-300 ease-in-out">

            <div className="flex items-center space-x-8">
                <h2 className="  text-xl text-dark-blue font-medium">Signature Experiences</h2>
                <img onClick={handleAddSignatureHighlights} src="/Icons/sqaure-add-icon.svg" alt="" className=" cursor-pointer size-7" />
            </div>

            {signatureHighlights?.map((data, index) => (
                <div key={index} ref={(el) => (signatureHighlightsRef.current[index] = el)} className={` my-1 relative flex flex-col space-y-4`}>

                    <div className=" w-full flex items-center space-x-5 mt-6">
                        <input type="text" value={data.title} onChange={(e) => handleSignatureChange(index, 'title', e.target.value)} placeholder="Title.." className={`${inputStyle}`} required />
                    </div>

                    <div className=" absolute flex items-center space-x-3 -right-48 top-8">
                        <ReorderIcons handleReorder={handleReorder} index={index} handleDelete={handleDeleteSignatureHighlights} arrayOfElements={signatureHighlights} setElements={setSignatureHighlights} />
                    </div>

                </div>))}
        </div>

    )
}

export default SignatureHighlights