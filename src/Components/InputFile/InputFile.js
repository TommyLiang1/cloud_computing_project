import React, { Component } from "react";
import { Amplify, Storage } from "aws-amplify";
import awsconfig from '../../aws-exports';
import './InputFile.css';

Amplify.configure(awsconfig);

let tmp = document.getElementById('upload-form');
if(tmp) {
  tmp.addEventListener('submit', e => {
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
} else {
  console.log(tmp);
}

class InputFile extends Component {
  render() {
    return (
      <form id="upload-form">
        <input className="button" id="file-upload" type="file" name="filename" accept=".mp3"/>
        <input className="button-36" type="submit" value="Upload"/>
      </form>
    );  
  }
}

export default InputFile;