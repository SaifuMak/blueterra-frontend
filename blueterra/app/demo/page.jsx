'use client'
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState, useEffect } from 'react';

export default function Demo() {

    const editorRef = useRef(null);
    const [isClient, setIsClient] = useState(false);

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

        <>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                apiKey='5x0d43so5yodigr6a7p6b1a09jh9n0ugfks5wljq1r0lm2wm'
                init={{
                    plugins: [
                        // Core editing features
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                        // Your account includes a free trial of TinyMCE premium features
                        // Try the most popular premium features until Jul 30, 2025:
                        'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
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
                initialValue="Welcome to TinyMCE!"
            />
            <div className=" w-full justify-center flex">
                <button onClick={handleGetContent} className=' mt-10 px-6 py-2 text-white bg-sky-blue-1'>Generate</button>
            </div>
        </>
    );
}