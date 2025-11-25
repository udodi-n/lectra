function Banner({image, className, imgClassName}) {
    return (
        <div className={className}>
            <img src={image} className={imgClassName}/>
        </div>
    )
}

export default Banner;