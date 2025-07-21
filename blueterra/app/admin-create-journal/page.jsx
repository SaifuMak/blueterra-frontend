'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState, useEffect } from 'react';
import { RiImageAddLine, AiOutlineCheck, RiAddCircleLine } from '@/components/reactIcons'
import { rubik } from '@/app/fonts'


export default function AdminJournals() {

    const editorRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    const [previewImage, setPreviewImage] = useState(null);
    const [journalCoverImage, setJournalCoverImage] = useState(null)
    const fileInputRef = useRef();

    const [sampleCategories, setSampleCategories] = useState(['Adventure', 'Beach', 'Cultural', ' Nature & Wildlife', 'Family Travel', 'Food & Culinary'])



    const [formDataState, setFormDataState] = useState({
        title: "",
        slug: "",
        meta_title: "",
        meta_description: "",
        selectedCategory: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCategorySelection = (category) => {
        setFormDataState((prev) => ({
            ...prev,
            selectedCategory: category
        }));
    }

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setJournalCoverImage(file)
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click(); // open file picker
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setJournalCoverImage(null)
        fileInputRef.current.value = null; // reset input
    };


    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleGetContent = () => {
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            console.log(content); // This will log the HTML content
            // You can now use this content as needed
            alert('Content logged to console!');
        }
    };

    if (!isClient) {
        return null; // or a loading placeholder
    }


    return (
        <div className={`${rubik.className} min-h-screen w-full`}>

            <Navbar />

            <div className=" w-full h-full  bg-[#F7FBFD] flex ">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1 text-dark-28  mt-10  ml-6  mr-8 mb-20   ">
                    <div className=" w-full  h-full space-x-5  flex">
                        <div className=" flex-1 flex-col space-y-5    ">
                            <h1 className=" text-3xl font-normal text-dark-28 ">Add New Journal</h1>
                            <div className=" w-full mt-10 space-y-5 ">
                                <input type="text" value={formDataState.title} name="title" onChange={handleChange} placeholder="Enter title" className="bg-white rounded-sm outline-none py-2 border w-full px-4  " />
                                <input type="text" value={formDataState.slug} name="slug" onChange={handleChange} placeholder="Enter slug" className="bg-white rounded-sm outline-none py-2 border w-full px-4  " />
                            </div>

                            <div className="  min-h-[300px]">
                                <Editor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    apiKey='5x0d43so5yodigr6a7p6b1a09jh9n0ugfks5wljq1r0lm2wm'
                                    init={{
                                        plugins: [
                                            // Core editing features
                                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                            // Your account includes a free trial of TinyMCE premium features
                                            // Try the most popular premium features until Jul 30, 2025:
                                            // 'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                                        ],
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                        tinycomments_mode: 'embedded',
                                        tinycomments_author: 'Author name',
                                        mergetags_list: [
                                            { value: 'First.Name', title: 'First Name' },
                                            { value: 'Email', title: 'Email' },
                                        ],
                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                    }}
                                // initialValue="Welcome to TinyMCE!"
                                />

                            </div>

                            <div className=" w-full  space-y-5 ">
                                <input type="text" value={formDataState.meta_title} name="meta_title" onChange={handleChange} placeholder="Enter Meta Title" className="bg-white rounded-sm outline-none py-2 border w-full px-4  " />
                                <input type="text" value={formDataState.meta_description} name="meta_description" onChange={handleChange} placeholder="Enter Meta Description" className="bg-white rounded-sm outline-none py-2 border w-full px-4  " />
                            </div>
                        </div>

                        <div className=" p-6 py-8  w-3/12 mt-10  h-full bg-white  border rounded-lg ">


                            <div className=" ">
                                <div className=" flex items-center justify-between ">
                                    <h2 className=" text-xl font-medium ">Post Journal </h2>

                                    <button className=" rounded-sm cursor-pointer text-sm font-medium tracking-wide bg-sky-blue-dark px-6 py-1.5 text-white">Publish</button>

                                </div>
                                <div className=" my-8 flex flex-col  ">
                                    <p className=""> Save & Publish Later</p>
                                    <button className=" mt-2 cursor-pointer  rounded-sm font-medium  border bg- px-4 py-2 text-sm bg-[#F7FBFD] text-dark-28">Save Draft</button>
                                    {/* <p className=" ">save for later</p> */}

                                </div>
                            </div>
                            {/* <div className=" w-full mt-10  ">
                                <label htmlFor="text" className=" font-medium" >Featured Image</label>
                                <div className=" mt-3 w-full cursor-pointer bg-[#F7FBFD] rounded-sm flex-center h-36 border ">
                                    <RiImageAddLine className=" text-2xl text-slate-400  " />
                                </div>
                                <p className=" text-right text-red-400 mt-1 text-sm hover:underline cursor-pointer">Remove Featured Image</p>
                            </div> */}

                            <div className="w-full mt-10">
                                <label htmlFor="featuredImage" className="font-medium">
                                    Featured Image
                                </label>

                                <input
                                    type="file"
                                    id="featuredImage"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleImageSelect}
                                />

                                <div
                                    onClick={handleDivClick}
                                    className="mt-3 w-full cursor-pointer bg-[#F7FBFD] rounded-sm flex items-center justify-center h-36 border relative overflow-hidden"
                                >
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="h-full object-cover w-full"
                                        />
                                    ) : (
                                        <RiImageAddLine className="text-2xl text-slate-400" />
                                    )}
                                </div>


                                <p
                                    onClick={handleRemoveImage}
                                    className={`text-right text-red-400 mt-2 text-sm hover:underline cursor-pointer ${previewImage ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    Remove Featured Image
                                </p>

                            </div>

                            <div className=" w-full  mt-10 ">
                                <div className=" flex items-center justify-between">
                                    <label htmlFor="text" className=" font-medium" >Select Catagory</label>
                                    <p className=" cursor-pointer flex items-center text-sky-blue-dark font-medium "><RiAddCircleLine className=" text-xl mr-0.5 " /> Add</p>

                                </div>
                                <div className=" flex flex-col mt-3 space-y-3 max-h-96 overflow-y-auto ">
                                    {sampleCategories?.map((category, index) => (
                                        <div key={index} onClick={() => handleCategorySelection(category)} className=" flex items-center  text-sm transition-all duration-500 cursor-pointer"> <span className="  inline-block border-dark-28/30 size-4    shrink-0 border  mr-2 "> {formDataState.selectedCategory === category && <AiOutlineCheck className="text-sm text-black" />}</span>{category}</div>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>


                </div>

            </div>
        </div>
    )
}