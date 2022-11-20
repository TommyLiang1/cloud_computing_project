import React, { useEffect } from "react";
import Amplify, { Storage } from "aws-amplify";
import awsconfig from '../../aws-exports';
import './InputFile.css';

function InputFile() {
  useEffect(() => {
    Amplify.configure(awsconfig);
    Storage.configure({
      bucket: 'mp3files160651-staging',
      level: 'private'
    })
  }, []);

  useEffect(() => {
    loadfiles();
    document.getElementById('upload-form').addEventListener('submit', e => {
      e.preventDefault();
      const file = document.getElementById('file-upload').files[0];

      const fileurl = URL.createObjectURL(file);
      
      const fdiv = document.createElement('div');
      const sdiv = document.createElement('div');
      const text = document.createTextNode(file.name);
      const audio = document.createElement('audio');
      const source = document.createElement('source');
      fdiv.appendChild(sdiv);
      fdiv.appendChild(audio);
      fdiv.setAttribute("class", "m-file")
      sdiv.appendChild(text);
      audio.appendChild(source);
      audio.setAttribute("controls","");
      audio.setAttribute("class","sound")
      source.setAttribute("src", fileurl);
      source.setAttribute("type", "audio/mpeg");
      document.querySelector('.tracks').appendChild(fdiv);
      
      Storage.put(file.name, file)
        .then(item => {
          console.log(item);
          loadfiles();
        })
        .catch(err => {
          console.log(err);
        })
    })
  }, [])
  
  const loadfiles = () => {

  }

  Storage.list('')
    .then(result => {
      result.forEach((item, i) => {
        if(item.key !== '') {
          Storage.get(item.key).then(result => {
            const fdiv = document.createElement('div');
            const sdiv = document.createElement('div');
            const text = document.createTextNode(item.key);
            const audio = document.createElement('audio');
            const source = document.createElement('source');
            fdiv.appendChild(sdiv);
            fdiv.appendChild(audio);
            fdiv.setAttribute("class", "m-file")
            sdiv.appendChild(text);
            audio.appendChild(source);
            audio.setAttribute("controls","");
            audio.setAttribute("class","sound")
            source.setAttribute("src", result);
            source.setAttribute("type", "audio/mpeg");

            document.querySelector('.tracks').appendChild(fdiv);
          })
        }
      })
    })
    .catch(err => console.log(err));

  return (
    <div>
      <form id="upload-form">
        <input id="file-upload" type="file" name="filename" accept=".mp3"/>
        <input className="button-36" type="submit" value="Upload"/>
      </form>
      <div className="playlist">
        <h1>Mp3 Playlist</h1>
        <div className="tracks">          
        </div>
      </div>
    </div>
  );
}

export default InputFile;