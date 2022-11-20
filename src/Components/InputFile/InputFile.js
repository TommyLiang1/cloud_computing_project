import React, { useEffect, useRef, useState } from "react";
import Amplify, { Storage } from "aws-amplify";
import awsconfig from '../../aws-exports';
import './InputFile.css';
import mp3 from './Justin_Bieber_Ghost.mp3';

function InputFile() {
  const ref = useRef(null);
  const audioRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [audioSrc, setAudioSrc] = useState();

  useEffect(() => {
    Amplify.configure(awsconfig);
    // Initialize the Amazon Cognito credentials provider
    // Amplify.configure({
    //   Auth: {
    //     IdentityPoolId: 'us-east-1:12f00fb2-f740-4e47-b7ba-a558a0c64dc2',
    //     region: 'us-east-1'
    //   }
    // });
  }, []);


  // useEffect(() => {
  //   document.getElementById('upload-form').addEventListener('submit', e => {
  //     e.preventDefault();
  //     const filename = ref.current.files[0].name;
  //     Storage.put(filename, ref.current.files[0])
  //       .then(item => {
  //         console.log(item);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   })
  // }, []);

  // useEffect(() => {
  //   Storage.list('')
  //     .then(files => { 
  //       setFiles(files);
  //       setAudioSrc(files[1].key);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
    
  // }, []);

  // const deleteFile = (file) => {
  //   Storage.remove(file)
  //     .then(res => {
  //       console.log(res);
  //       loadMP3s();
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  // const loadMP3s = () => {
  //   Storage.list('')
  //     .then(files => {
  //       // console.log(files);
  //       setFiles(files);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  // const loadFile = (e) => {
  //   ref.preventDefault();
  //   const filename = ref.current.files[0].name;
  //   Storage.put(filename, ref.current.files[0])
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }

  // const start = () => {
  //   audioRef.current.play();
  // }

  // const pause = () => {
  //   audioRef.current.pause();
  // }

  useEffect(() => {
    document.getElementById('upload-form').addEventListener('submit', e => {
      e.preventDefault();
      const file = document.getElementById('file-upload').files[0];
      
      Storage.put(file.name, file)
        .then(item => {
          console.log(item);
        })
        .catch(err => {
          console.log(err);
        })
    })
  }, [])

  Storage.list('')
    .then(result => {
      result.forEach(item => {
        if(item.key !== '') {
          Storage.get(item.key).then(result => {
            const audio = document.createElement('audio');
            const source = document.createElement('source');
            audio.appendChild(source);
            audio.setAttribute("controls","");
            audio.setAttribute("class","sound")
            source.setAttribute("src", result);
            source.setAttribute("type", "audio/mpeg");

            document.querySelector('.tracks').appendChild(audio);
          })
        }
      })
    })
    .catch(err => console.log(err));

  return (
    <div>
      <form id="upload-form">
        <input ref={ref} id="file-upload" type="file" name="filename" accept=".mp3"/>
        <input className="button-36" type="submit" value="Upload"/>
      </form>
      <div className="playlist">
        <h1>Mp3 Playlist</h1>
        <div className="tracks">          
          {/* {files.map((file, i) => (
            <div key={file.key}>
              <div className="index">{i}</div> 
              <div className="filename">{file.key}</div>
              <button onClick={deleteFile}>delete</button>
            </div>
          ))}
          <audio ref={audioRef} src={audioSrc} className="sound"/>
          <button onClick={start}>Play</button>
          <button onClick={pause}>Pause</button> */}
        </div>
      </div>
    </div>
  );
}

export default InputFile;