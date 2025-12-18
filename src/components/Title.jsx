function Title({title, setBool= true}) {
            return(
                <h2 className={`${setBool ? '' : 'hidden'} font-[Google_Sans_Flex] underline text-3xl text-white`}>
                {title}
                </h2>
            )

}

export default Title