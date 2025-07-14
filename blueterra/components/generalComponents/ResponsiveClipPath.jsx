import Image from 'next/image';

const ResponsiveClipPath = ({ outerClass, ImagePath }) => {
    return (
        <div className={`${outerClass} `}>
            <Image
                src={ImagePath}
                alt='clip path'
                fill
                priority
                style={{ objectFit: 'cover' }}
            />
        </div>
    );
};

export default ResponsiveClipPath;
