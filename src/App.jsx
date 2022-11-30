import './App.css'
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { GrRefresh } from "react-icons/gr";
import { useRef, useState } from 'react';

function App() {

  const input = useRef(null);
  const area = useRef(null);
  const [image, setImage] = useState(true);
  const [message, setMessage] = useState('Drag and Drop to Upload File');

  const handleInput = (e) => {
    input.current.click();
  }

  const refresh = () => {
    window.location.reload();
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setMessage('Release to show image');
    area.current.classList.add('active');
  }

  const handleDragLeave = (e) => {
    setMessage('Drag and Drop to Upload File');
    area.current.classList.remove('active');
  }

  const handleDrop = (e) => {
    e.preventDefault();
    area.current.classList.add('active');
    const files = e.dataTransfer.files;
    if(files.length !== 0) {
      const file = files[0];
      imageValidity(file);
    }
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
      setImage(false);
    }
    fileReader.readAsDataURL(file);
  }

  return (
    <section className='flex flex-col items-center space-y-5'>
      <div 
        className="image-area border-2 border-dashed border-white md:h-[400px] md:w-[600px] rounded-lg flex flex-col items-center justify-center space-y-4 h-[200px] w-[300px]"
        ref={area}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <BsFillCloudArrowUpFill className='text-4xl md:text-8xl' />
        <header 
          className='text-sm md:text-2xl'
        >
          { message }
        </header>
        <span className='text-sm md:text-2xl'>OR</span>
        <input 
          type="file" 
          className='hidden' 
          ref={input}
          onChange={handleChange}
        />
        <button 
          className='px-2 py-2 md:px-4 md:py-3 bg-violet-600 scale-100 rounded-md md:hover:scale-105'
          onClick={handleInput}
        >
          Browse File
        </button>
      </div>
      <button
        className='bg-white px-4 py-2 rounded-md group'
        onClick={refresh}
        hidden={image}
      >
        <GrRefresh className='text-3xl group-hover:rotate-180 group-hover:transition-transform group-hover:duration-1000' />
      </button>
    </section>
  )
};

export default App;
