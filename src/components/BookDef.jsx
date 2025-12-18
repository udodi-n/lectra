import { useState, useEffect } from 'react'
function BookDef({name = '', cost = '', img ='', action, btn}) {

    const [book, setBook] = useState(name)
    const [price, setPrice] = useState(cost)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(img)
    
    function handleFileUpload(e) {
       const selectedFile = e.target.files[0]
       if (!selectedFile) return

       setFile(selectedFile)
       setPreview(URL.createObjectURL(selectedFile))
    }

    useEffect(() => {
        setBook(name);
        setPrice(cost);
        setPreview(img)
    }, [name, cost, img]);


    async function handleSubmit(e) {
        e.preventDefault(); 

        let imgurl = preview;

        if (file) {
        const data = new FormData();
        data.append("file", file)
        data.append("upload_preset", "book_upload")
        data.append("cloud_name", "dqiywjlwt")

        const res = await fetch(" https://api.cloudinary.com/v1_1/dqiywjlwt/image/upload", {
            method: "POST",
            body: data
        })

        const uploadImageURL = await res.json();
        imgurl = uploadImageURL.url
    }
        action({
            name: book,
            price: price,
            imageURL: imgurl
        })
}

    return (
            <div className="w-4/5 h-fit  bg-white rounded-[36px] p-[8px]">
                {/* Upload */}
                <form 
                action=""
                onSubmit={handleSubmit}
                className="h-full w-full flex flex-col justify-center items-center p-3"
                >
                    <div className={`relative w-full h-50  border-5 border-[#9c9c9c] border-dashed rounded-[32px] flex justify-center items-center gap-4 p-4 bg-center`}
                    style={{
                        backgroundImage: preview? `url(${preview})` : undefined,
                        
                        backgroundColor: "rgba(236, 236, 236, 0.65)",
                        backgroundSize: "cover"
                    }}
                    >
                    <div className="bg-white gap-4 p-1 border-1 border-black flex">
                        <span className=" ">Click to Upload</span>
                        <img src="/upload.png" className="aspect-square w-5" alt="" />
                    </div>
                    <input className="absolute inset-0 opacity-0" type="file" onChange={handleFileUpload} accept="image/*"/>
                    </div>
                    <div className="flex flex-col flex-1 w-full items-center gap-6 ">
                        {/* Book */}
                        <input className="mt-10 w-full px-3 py-2 border-1 border-black focus:outline-none" type="text" label="Name" onChange={(e) => setBook(e.target.value)} value={book} placeholder="Fundamental Mechanics"/>

                        {/* Price */}
                        <input className="w-full flex px-3 py-2 border-1 border-black focus:outline-none" type="text" label="Price" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="N6700"/>
                        <button className="bg-black w-full py-3 text-white">{btn}</button>


                    </div>
                </form>
                </div>
    )
}

export default BookDef