import { useState,useEffect } from "react";

const ImageUpload = () => {
    const [sliderImages, setSliderImages] = useState([]);
    const [bannerImage, setBannerImage] = useState([]);

    const data  =   {
        bannerImage: "https://i.ibb.co/rtmKD8G/bottom-banner.png",
        sliderImages:  [  
            {id: 1, image: 'https://i.ibb.co/9vCg896/Middle-Slider-1.png'},
            {id: 2, image: 'https://i.ibb.co/n8Kq6ZF/Middle-Slider-2.png'},
            {id: 3, image: 'https://i.ibb.co/b3LPTKj/Middle-Slider.png'}
         ]
     }   

     console.log(data.bannerImage);

     useEffect(() => {
        setSliderImages(data.sliderImages.map(image => image.image));
        setBannerImage([data.bannerImage]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      console.log(bannerImage);
  
    const handleFileChange = async (event,num) => {
       console.log(num);
        const image = event.target.files[0]

        // event.preventDefault();
    
        const formData = new FormData();
        formData.append('image', image);
    
        try {
            const response = await fetch('https://api.imgbb.com/1/upload?&key=a756674ea8d16896e53242b8f2d31182', {
              method: 'POST',
              body: formData,
            });
    
            const data = await response.json();
            console.log(data);
            

            // Add the image URL to the array of images
            if(num == 1) {
            setSliderImages([...sliderImages, data.data.url]);
            }else if(num == 2) {
                setBannerImage([data.data.url])
            }

            
        } catch (error) {
          console.error(error);
        }
    }

    const handleDelete = (index) => {
        const newImages = [...sliderImages];
        newImages.splice(index, 1);
        setSliderImages(newImages);
    };

    const handleBannerDelete = (index) => {
        const newImages = [...bannerImage];
        newImages.splice(index, 1);
        setBannerImage(newImages);
    };


    const handleSubmit =  (event) => {
        event.preventDefault();
        const customizeImages ={
           bannerImage:bannerImage[0],
           sliderImages:  [
            {
                id: 1,
                image: sliderImages[0] || '',
            },
            {
                id: 2,
                image: sliderImages[1] || '',
            },
            {
                id: 3,
                image: sliderImages[2] || '',
            }
            ]
        }   
          console.log(customizeImages);
      };
    return (
        
        <div className="grid grid-cols-2 gap-10 gap-y-16 justify-center items-center  m-5 bg-white rounded-sm shadow min-w-[900px] w-[1300px] py-4">
        

           
            <form className="pl-5 flex justify-center items-center" onSubmit={handleSubmit} > 
                <div> 
                    <h2 className="mb-4 mt-4 text-2xl font-extrabold text-gray-700" >Upload slider images</h2>
                    <div className="flex items-center justify-center flex-col w-96 mb-8">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">PNG, JPG or GIF (Width-328px and Height-111px)</p>
                            </div>
                            <input id="dropzone-file" name="sliders" type="file" className="hidden" disabled={sliderImages.length > 2} onChange={(e)=>handleFileChange(e,1)} />
                        </label>
{/* 
                        <button className="bg-primaryRed font-medium text-white p-3 w-full rounded mt-4" type="submit">Upload Image</button> */}
                    </div>
                </div>
            </form>
            
            { sliderImages &&
           <div className="images flex flex-col  justify-center items-center gap-4">
                {sliderImages.map((imageUrl, index) => (
                    <div className="relative" key={index}>
                        <img className="w-[328px] h-[111px]" src={imageUrl} alt="Uploaded" />
                        <button className="absolute top-8 right-4 z-10 text-white" type="button" onClick={() => { handleDelete(index); }}>X</button>
                    </div>
                ))}
           </div>}



           <form className="pl-5 flex justify-center items-center" onSubmit={handleSubmit} > 
                <div> 
                    <h2 className="mb-4 mt-4 text-2xl font-extrabold text-gray-700" >Upload Baner image</h2>
                    <div className="flex items-center justify-center flex-col w-96 mb-8">
                        <label htmlFor="dropzone-file-2" className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500">PNG, JPG or GIF (Width-328px and Height-120px)</p>
                            </div>
                            <input id="dropzone-file-2" name="banner" type="file" className="hidden"  onChange={(e)=>handleFileChange(e,2)} />
                        </label>

                        <button className="bg-primaryRed font-medium text-white p-3 w-full rounded mt-4" type="submit">Upload Images</button>
                    </div>
                </div>
            </form>

            { bannerImage &&
           <div className="images flex flex-col  justify-center items-center gap-4">
                {bannerImage.map((imageUrl, index) => (
                    <div className="relative" key={index}>
                        
                        <img className="w-[328px] h-[120px]" src={imageUrl} alt="Uploaded" />
                        <button className="absolute top-2 right-5 z-10 text-white" type="button" onClick={() => { handleBannerDelete(index); }}>X</button>
                    </div>
                ))}
           </div>}
        </div>
    )
}
export default ImageUpload