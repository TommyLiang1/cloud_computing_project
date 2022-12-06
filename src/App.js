import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import InputFile from './Components/InputFile/InputFile';

import { withAuthenticator } from '@aws-amplify/ui-react';

function App({ signOut, user }) {
  return (
    <div className='App'>
      <Header />
      <div id="user">
        <div>User Email: {user.attributes.email}</div>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <InputFile />
      <Footer />
    </div>
  );
}

export default withAuthenticator(App);
