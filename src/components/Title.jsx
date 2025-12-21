function Title({title, setBool= true}) {
            return(
                <h2 className={`${setBool ? '' : 'hidden'} dark:text-white font-[Google_Sans_Flex] underline text-3xl`}>
                {title}
                </h2>
            )

}

export default Title