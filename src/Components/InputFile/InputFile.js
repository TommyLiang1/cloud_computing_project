import React, { useEffect } from "react";
import './InputFile.css';

const InputFile = () => {
  useEffect(() => {
    document.getElementById('upload-form').addEventListener('submit', e => {
      e.preventDefault();
      const file = document.getElementById('file-upload').files[0];
      console.log(file);
      
      const fileurl = URL.createObjectURL(file);
      
      const audio = document.createElement('audio');
      const source = document.createElement('source');
      audio.appendChild(source);
      audio.setAttribute("controls","")
      audio.setAttribute("class","sound")
      source.setAttribute("src", fileurl)
      source.setAttribute("type", "audio/mpeg")
      document.querySelector('.tracks').appendChild(audio);

      // Storage.put(file.name, file)
      //   .then(item => {
      //     console.log(item);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   })
    })
  }, [])
  return (
    <div>
      <form id="upload-form">
        <input className="button" id="file-upload" type="file" name="filename" accept=".mp3"/>
        <input className="button-36" type="submit" value="Upload"/>
      </form>
      <div className="tracks"></div>
    </div>
  );
}

export default InputFile;