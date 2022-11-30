import './App.css'
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { useEffect, useRef, useState } from 'react';

function App() {

  const input = useRef(null);
  const area = useRef(null);
  const image = useState('');

  const handleInput = (e) => {
    input.current.click();
  }

  const handleChange = (e) => {
    const files = input.current.files;
    if(files.length !== 0) {
      const file = files[0];
      imageValidity(file);
    }
  }

  const imageValidity = (file) => {
    const type = file.type;
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if(validExtensions.includes(type)) {
      area.current.classList.add('active');
      showImage(file);
    }
    else {
      alert('This is not an image File !');
      area.current.classList.remove('active');
    }
  }

  const showImage = (file) => {
    var fileReader = new FileReader() //creating new FileReader object
    fileReader.onload = () => {
      const fileURL = fileReader.result; //passing user file url source
      const imgTag = `<img src="${fileURL}" alt="${file.name}" />`;
      area.current.innerHTML = imgTag;
    }
    fileReader.readAsDataURL(file);
  }

  return (
    <div 
      className="image-area border-2 border-dashed border-white h-[400px] w-[600px] rounded-lg flex flex-col items-center justify-center space-y-4"
      ref={area}
    >
      <BsFillCloudArrowUpFill className='text-8xl' />
      <header 
        className='text-2xl'
      >
        Click on the button to upload a file
      </header>
      <input 
        type="file" 
        className='hidden' 
        ref={input}
        onChange={handleChange}
      />
      <button 
        className='px-4 py-3 bg-violet-600 scale-100 rounded-md hover:scale-105'
        onClick={handleInput}
      >
        Browse File
      </button>
    </div>
  )
}

export default App
