import React from 'react'
import Image from 'next/image'

const BackgroundClipPath = ({ outerClass, ImagePath, width, height }) => {
    return (
        <div className={outerClass}>
            <Image
                src={ImagePath}
                alt='clip path'
                width={width}
                height={height}
                priority
                style={{ objectFit: 'cover' }}
            />
        </div>

    )
}

export default BackgroundClipPath