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
    document.getElementById('upload-form').addEventListener('submit', e => {
      e.preventDefault();
      const file = document.getElementById('file-upload').files[0];
      
      const fileurl = URL.createObjectURL(file);
      
      // Create HTML display for MP3 file
      const div = document.createElement('div');
      const text = document.createTextNode(file.name);
      const audio = document.createElement('audio');
      const source = document.createElement('source');
      const button = document.createElement('button');
      div.appendChild(text);
      div.appendChild(audio);
      div.appendChild(button);
      div.setAttribute("class", "m-file")
      audio.appendChild(source);
      audio.setAttribute("controls","");
      audio.setAttribute("class","sound")
      source.setAttribute("src", fileurl);
      source.setAttribute("type", "audio/mpeg");
      button.setAttribute("class", "delete");
      button.textContent = 'X';
      // Add a remove MP3 file functionality for every added MP3 file
      button.addEventListener("click", 
        function() {
          Storage.remove(file.name)
            .then(res => {
              console.log(res);
              document.querySelector('.tracks').removeChild(div);
            })
            .catch(err => {
              console.log(err);
            })
        }
      )
      document.querySelector('.tracks').appendChild(div);
      
      // Add MP3 file to S3
      Storage.put(file.name, file)
        .then(item => {
          console.log(item);
        })
        .catch(err => {
          console.log(err);
        })
      
      // Reset form
      document.getElementById('upload-form').reset();
    })
  }, [])

  // Load all MP3 files in S3 corresponding to user
  Storage.list('')
    .then(result => {
      result.forEach((item, i) => {
        if(item.key !== '') {
          Storage.get(item.key).then(result => {
            const div = document.createElement('div');
            const text = document.createTextNode(item.key);
            const audio = document.createElement('audio');
            const source = document.createElement('source');
            const button = document.createElement('button');
            div.appendChild(text);
            div.appendChild(audio);
            div.appendChild(button);
            div.setAttribute("class", "m-file")
            audio.appendChild(source);
            audio.setAttribute("controls","");
            audio.setAttribute("class","sound")
            source.setAttribute("src", result);
            source.setAttribute("type", "audio/mpeg");
            button.setAttribute("class", "delete");
            button.textContent = 'X';
            // Add a remove MP3 file functionality for every existing MP3 file
            button.addEventListener("click", 
              function() {
                Storage.remove(item.key)
                  .then(res => {
                    console.log(res);
                    document.querySelector('.tracks').removeChild(div);
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            )
            document.querySelector('.tracks').appendChild(div);
          })
        }
      })
    })
    .catch(err => console.log(err));

  return (
    <div>
      <form id="upload-form">
        <input id="file-upload" type="file" name="filename" accept=".mp3"/>
        <input id="upload-button" className="button-36" type="submit" value="Upload"/>
      </form>
      <div className="playlist">
        <h1>Mp3 Playlist</h1>
        <div className="tracks"></div>
      </div>
      <div className="footerLength"></div>
    </div>
  );
}

export default InputFile;