import React, { useRef, useState } from 'react'
import './ImageGenerator.css';
import defualt_image from '../assest/default_image.svg';
const ImageGenerator = () => {

    const [image_url , setImage_url] = useState('/');
    let inputRef = useRef(null);

    const ImageGenerator = async ()=>{
        if(inputRef.current.value === ''){
            return 0;
        }

        const response = await fetch(
          "https://api.openai.com/v1/images/generations",
          {
            method:"POST",
            headers:{
              "Content-Type": "application/json",
              Authorization:
              "Bearer api",
              "User-Agent":"Chrome"
            },
            body:JSON.stringify({
              prompt: `${inputRef.current.value}`,
              n:1,
              size:"512x512",
            }),
          }
        );
        let data = await response.json();
        console.log(data)
        let data_array = data.data;
        setImage_url(data_array[0].url);
    }

  return (
    <div>
     <div className='ai-image-generator'>
       <div className='header'>Ai image <span>generator</span></div>
       <div className='img-loading'>
       <div className='image'> <img src={image_url === '/'?defualt_image : image_url}/> </div>
        
       </div> 
       <div className='search-box'>
    <input type='text' ref={inputRef} className='search-input' placeholder='Describe what you want to say..'/>
    <button className='generate-btn' onClick={()=>{ImageGenerator()}}>Generate</button>
    </div>
    </div>
    
</div> 
  )
}

export default ImageGenerator
