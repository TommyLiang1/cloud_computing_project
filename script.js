import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

document.getElementById('file-upload').addEventListener('submit', e=> {
  e.preventDefault()
  const file = document.getElementById('file-upload').files[0];
  console.log(file);
})