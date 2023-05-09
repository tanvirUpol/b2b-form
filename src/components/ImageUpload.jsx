import { useState,useEffect } from "react";

const ImageUpload = () => {
    const [images, setImages] = useState([]);
  
    const handleFileChange = async (event) => {
       
        const image = event.target.files[0]

        // event.preventDefault();
    
        const formData = new FormData();
        formData.append('image', image);
        console.log(image);
    
        try {
            const response = await fetch('https://api.imgbb.com/1/upload?&key=a756674ea8d16896e53242b8f2d31182', {
              method: 'POST',
              body: formData,
            });
    
            const data = await response.json();
            console.log(data);
            

            // Add the image URL to the array of images
            setImages([...images, data.data.url]);

            
        } catch (error) {
          console.error(error);
        }
    }

    const handleDelete = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    useEffect(() => {
        console.log(images);
    }, [images]);

    const handleSubmit =  (event) => {
        event.preventDefault();
        const sliderJson = [
            {
                id: 1,
                image: images[0] || '',
            },
            {
                id: 2,
                image: images[1] || '',
            },
            {
                id: 3,
                image: images[2] || '',
            }
    ];
          console.log(sliderJson);
      };
    return (
        
        <div className="flex flex-col gap-5 justify-center items-center">
           
           <div className="images flex justify-center items-center gap-4">
                {images.map((imageUrl, index) => (
                    <div className="relative" key={index}>
                        <img className="w-[328px] h-[111px]" src={imageUrl} alt="Uploaded" />
                        <button className="absolute top-8 right-4 z-10 text-white" type="button" onClick={() => { handleDelete(index); }}>X</button>
                    </div>
                ))}
           </div>

            { images.length < 3 &&
            <form onSubmit={handleSubmit} >      
                <div className="flex items-center justify-center flex-col w-96 mb-8">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (Ratio: 4:1)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={(e)=>handleFileChange(e)} />
                    </label>

                    <button className="bg-primaryRed text-white p-2 rounded mt-4" type="submit">Upload Image</button>
                </div>

            </form>
            }


            {/* <form>
                <div className="flex items-center justify-center w-96">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (Ratio: 4:1)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </form> */}

        </div>
    )
}
export default ImageUpload