import { RxCross2 } from '@/components/reactIcons'
import useClickOutside from '@/app/hooks/useClickOutside';
import { useEffect } from 'react';
import { useLenis } from '../SmoothScroll';

export default function ZohoFormModal({ isOpen, onClose }) {

    const lenis = useLenis();
    const ZohoFormsRef = useClickOutside(onClose)

    useEffect(() => {

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
                <iframe 
                    title="Zoho Form"
                    src="https://forms.zohopublic.com/blueterra1/form/TravelForm/formperma/8xKLx9aFufgItc2qpkge4Ajnx1XlnCWT9mq-W5iJopA"
                    className="w-full h-full"
                    allowFullScreen
                />
            </div>
        </div>
    );
}
