import React, {Component} from "react";
import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <footer>
          <p>Copyright &copy; <script>document.write(new Date().getFullYear())</script></p>
          <p>Version 15.1.03.03 </p>
      </footer>
    );
  }
} 

export default Footer;