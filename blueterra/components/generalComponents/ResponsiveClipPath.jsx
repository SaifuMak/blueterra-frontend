import Image from 'next/image';

const ResponsiveClipPath = ({ outerClass, ImagePath, width=500, height=1000 }) => {
    return (
        <div className={`${outerClass} `}>
            <Image
                src={ImagePath}
                alt='clip path'
                width={width}
                height={height}
                priority
                style={{ objectFit: 'cover' }}
            />
        </div>
    );
};

export default ResponsiveClipPath;
