import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import InputFile from './Components/InputFile/InputFile';

import { withAuthenticator } from '@aws-amplify/ui-react';

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       currentUser: Number,
//       allUsers: [{
//         userEmail: String, 
//         userPlaylist: []
//       }]
//     }
//   }

function App({ signOut, user }) {
  return (
    <div className='App'>
      <Header />
      <div id="user">
        <span>User Email: {user.attributes.email}</span>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <InputFile />
      <Footer />
    </div>
  );
}

export default withAuthenticator(App);
