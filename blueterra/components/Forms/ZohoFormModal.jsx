import { RxCross2 } from '@/components/reactIcons'
import useClickOutside from '@/app/hooks/useClickOutside';
import { useEffect, useState } from 'react';
import { useLenis } from '../SmoothScroll';

export default function ZohoFormModal({ isOpen, onClose }) {

    const lenis = useLenis();
    const ZohoFormsRef = useClickOutside(onClose)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)

        if (isOpen) {

            lenis?.stop();
            document.body.style.overflow = 'hidden';

        } else {

            lenis?.start();
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, lenis]);

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div ref={ZohoFormsRef} className="relative bg-white w-11/12 max-w-4xl py-10 h-[85vh] rounded-xl shadow-lg overflow-hidden">
                <RxCross2 className=' cursor-pointer absolute text-3xl text-dark-28 top-5 right-5' onClick={onClose} />

                {/* Loader overlay */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="w-10 h-10 border-4 border-sky-blue-1 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <iframe
                    title="Zoho Form"
                    src="https://forms.zohopublic.com/blueterra/form/TravelForm/formperma/8xKLx9aFufgItc2qpkge4Ajnx1XlnCWT9mq-W5iJopA"
                    className="w-full h-full"
                    allowFullScreen
                    onLoad={() => setLoading(false)}
                />
            </div>
        </div>
    );
}
