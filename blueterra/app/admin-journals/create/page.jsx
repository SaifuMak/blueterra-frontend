'use client'
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState, useEffect } from 'react';
import { RiImageAddLine, AiOutlineCheck, RiAddCircleLine, RxCross2 } from '@/components/reactIcons'
import { rubik } from '@/app/fonts'
import AXIOS_INSTANCE from "@/lib/axios";
import { toast } from 'sonner';

export default function AdminJournals() {

    const editorRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

    const [previewImage, setPreviewImage] = useState(null);
    const [journalCoverImage, setJournalCoverImage] = useState(null)

    const [createCategoryPopupOpened, setCreateCategoryPopupOpened] = useState(false)
    const fileInputRef = useRef();
    const createCategoryInputRef = useRef()

    const [newCategory, setNewCategory] = useState('')

    const [categories, setCategories] = useState([])


    const [formDataState, setFormDataState] = useState({
        title: "",
        slug: "",
        blog_content: "",
        meta_title: "",
        meta_description: "",
        category_name: "",
        is_published: true,
    });


    const fetchCategories = async () => {
        try {
            const response = await AXIOS_INSTANCE.get(`journal-categories/`)
            setCategories(response?.data)

        }
        catch (e) {
            console.log(e)
        }
    }


    const confirmAddCategory = async (category) => {

        const data = {
            category: category
        }
        try {
            const response = await AXIOS_INSTANCE.post(`journal-categories/`, data)
            fetchCategories()
            setCreateCategoryPopupOpened(false)
            setNewCategory('')
            toast.success(response?.data?.message)

        }
        catch (e) {
            console.log(e)
        }
    }


    const handleClearFormDataState = () => {

        setFormDataState({
            title: "",
            slug: "",
            blog_content: "",
            meta_title: "",
            meta_description: "",
            category_name: "",
            is_published: true,
        })
    }

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
            category_name: category
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

    const handleOpenCreateCategoryPopup = () => {
        setCreateCategoryPopupOpened(true)
        setTimeout(() => {
            createCategoryInputRef?.current.focus()
        }, 500);
    }

    useEffect(() => {
        setIsClient(true);
        fetchCategories()
    }, []);


    const handleSubmit = async (e, publish = true) => {
        toast.dismiss()
        e.preventDefault(); // prevent page reload

        if (!formDataState.category_name) {
            toast.error('Please select a category');
            return
        }
        // if (!journalCoverImage) {
        //     toast.error('Please select a preview image');
        //     return
        // }

        if (editorRef.current) {
            const content = editorRef.current.getContent();
            if (!content) {
                toast.error("Journal content can't be empty.");
                return
            }

            // Directly include the content in the formData
            const updatedFormData = {
                ...formDataState,
                blog_content: content,
                is_published: publish,
                // preview_image: journalCoverImage,
            };

            console.log(updatedFormData);
            setFormDataState(updatedFormData)

            try {
                const response = await AXIOS_INSTANCE.post('journals/', updatedFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                toast.success(publish ? "Blog post published successfully!" : "Draft saved successfully.");
                editorRef.current.setContent('')
                handleClearFormDataState()
            }
            catch (e) {
                const firstError = Object.values(e?.response?.data)?.[0]?.[0];
                toast.error(firstError || "Something went wrong.");

            }
        }
        else {
            toast.error('Editor not initialized.');
        }

    };



    if (!isClient) {
        return null; // or a loading placeholder
    }


    return (
        <div className={`${rubik.className} relative min-h-screen w-full`}>

            <Navbar />

            <div className=" w-full h-full  bg-[#F7FBFD] flex ">

                {/* sidebar */}
                <Sidebar />

                <div className=" flex-1 text-dark-28  mt-10  ml-6  mr-8 mb-20   ">

                    <form onSubmit={handleSubmit}>

                        <div className=" w-full  h-full space-x-5  flex">

                            <div className=" flex-1 flex-col space-y-5    ">
                                <h1 className=" text-2xl 2xl:text-3xl font-normal text-dark-28 ">Add New Journal</h1>
                                <div className=" w-full mt-10 space-y-5 ">
                                    <input type="text" value={formDataState.title} name="title" onChange={handleChange} placeholder="Enter title" className="bg-white rounded-sm outline-none py-2 border w-full px-4  " required />
                                    <input type="text" value={formDataState.slug} name="slug" onChange={handleChange} placeholder="Enter slug" className="bg-white rounded-sm outline-none py-2 border w-full px-4  " required />
                                </div>

                                <div className=" min-h-[400px]   xl:min-h-[300px] outline-none">
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
                                    <input type="text" value={formDataState.meta_title} name="meta_title" onChange={handleChange} placeholder="Enter Meta Title" className="bg-white rounded-sm outline-none py-2 border w-full px-4  " required />
                                    <input type="text" value={formDataState.meta_description} name="meta_description" onChange={handleChange} placeholder="Enter Meta Description" className="bg-white rounded-sm outline-none py-2 border w-full px-4  " required />
                                </div>

                            </div>


                            <div className=" p-4 2xl:p-6 py-8  w-3/12 mt-10  h-full bg-white  border rounded-lg ">

                                <div className=" ">
                                    <div className=" flex items-center justify-between ">
                                        <h2 className=" text-lg 2xl:text-xl font-medium ">Post Journal </h2>

                                        <button onClick={(e) => handleSubmit(e, true)} className=" max-xl:hidden rounded-sm cursor-pointer text-sm font-medium tracking-wide bg-sky-blue-dark px-4 2xl:px-6 py-1.5 text-white">Publish</button>

                                    </div>
                                    <button onClick={(e) => handleSubmit(e, true)} className=" xl:hidden mt-4 rounded-sm cursor-pointer text-sm w-full font-medium tracking-wide bg-sky-blue-dark px-4 2xl:px-6 py-1.5 text-white">Publish</button>

                                    <div className=" my-8 flex flex-col  ">
                                        <p className=" max-xl:text-sm"> Save & Publish Later</p>
                                        <button onClick={(e) => handleSubmit(e, false)} className=" mt-2  cursor-pointer  rounded-sm font-medium  border bg- px-4 py-2 text-sm bg-[#F7FBFD] text-dark-28">Save Draft</button>
                                        {/* <p className=" ">save for later</p> */}

                                    </div>
                                </div>


                                <div className="w-full 2xl:mt-10">
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
                                        className="mt-3 w-full cursor-pointer bg-[#F7FBFD] rounded-sm flex items-center justify-center h-28 xl:h-36 border relative overflow-hidden"
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



                                <div className=" w-full  2xl:mt-10 ">
                                    <div className=" flex max-xl:flex-col xl:items-center justify-between">
                                        <label htmlFor="text" className=" font-medium" >Select Catagory</label>
                                        <p onClick={handleOpenCreateCategoryPopup} className=" cursor-pointer flex items-center text-sky-blue-dark font-medium "><RiAddCircleLine className=" 2xl:text-xl mr-0.5 " /> Add</p>

                                    </div>
                                    <div className=" flex flex-col mt-3 space-y-3 max-h-96 overflow-y-auto ">
                                        {categories?.map((data, index) => (
                                            <div key={index} onClick={() => handleCategorySelection(data.category)} className=" flex items-center  capitalize text-sm transition-all duration-500 cursor-pointer"> <span className="  inline-flex flex-center border-dark-28/30 2xl:size-4 size-4    shrink-0 border  mr-2 "> {formDataState.category_name === data.category && <AiOutlineCheck className="2xl:text-sm text-xs text-black" />}</span>{data.category}</div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </form>


                </div>

            </div>



            {createCategoryPopupOpened && <div className="fixed z-50 bg-white/70 text-dark-28 inset-0 flex items-center justify-center">
                <div className="bg-white relative rounded-lg  shadow-xl p-6 w-100">
                    <h2 className="text-lg font-medium mb-4 text-dark-4B ">Add New Category</h2>
                    <input ref={createCategoryInputRef} type="text" onChange={(e) => setNewCategory(e.target.value)} value={newCategory} placeholder="" className=" px-2 py-1 w-full  outline-none border rounded-sm" />
                    <div className=" flex justify-center mt-4">
                        <button onClick={() => confirmAddCategory(newCategory)} className=" mt-1 cursor-pointer rounded-sm font-medium  border bg- px-4 py-1 text-sm bg-[#F7FBFD] ">Save </button>
                    </div>
                    <RxCross2 onClick={() => setCreateCategoryPopupOpened(false)} className=" text-dark-4B cursor-pointer absolute text-xl top-3 right-3" />
                </div>
            </div>}
        </div>
    )
}