import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import nLogo from "../../assets/images/nownow.jpg"

function LandingPage() {

  return(
    <div className='landing-main-container'>
      <div>
        <img src={nLogo} />
      </div>
      <div>
        <p>Welcome to MR.POS</p>
      </div>
      <div class="container div-class" >
        <button class = "button">
          <Link to={"/login"}>Login</Link>
        </button>
      </div>
    </div>
  )
}


export default LandingPage;

