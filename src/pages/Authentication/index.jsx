import React, { useState } from 'react';

import './styles.css';
import logo from "../../assets/images/Logo.svg";
import transc from "../../assets/images/bg-login.png";
import pcidss from "../../assets/images/pci-dss-logo.png";
import { MakeApiRequest } from "../../api/MakeApiRequest";


function Authentication() {
  const [requestPayload, setRequestPayload] = useState({});

  const handleOnChangeEvent = (event) => setRequestPayload(prev => ({...prev, [event.target.name]: event.target.value}));

  const handleSubmit = async () => await MakeApiRequest.authenticate(requestPayload);

  return(
    <div className={"auth-main-section"}>
      <div className={"auth-main-container"}>
        <div className={"auth-left-section"}>
          <h1>
            <img src={logo} alt={""}/>
          </h1>
          <p className={"auth-left-txt"}>NowNow allows everyone to use the services and pay for the widest range of transactions.</p>
          <img src={transc} alt={""}/>
        </div>
        <div className={"auth-right-section"}>
          <h1>Login</h1>
          <p>Login to your NowNow Account</p>
        <div className={"auth-right-section-form"}>
          <div className='p-form-container'>
            <input
              type='text'
              placeholder='Enter username'
              name={"username"}
              className='dashboard-content-input'
              onChange={handleOnChangeEvent}
            />
          </div>
          <div className='p-form-container'>
            <input
              type='password'
              placeholder='Enter password'
              name={"password"}
              className='dashboard-content-input'
              onChange={handleOnChangeEvent}
            />
          </div>
          <div className="p-form-container">
          <button
            className=""
            type={"button"}
            onClick={handleSubmit}>Login</button>
          </div>
          <div className={"pci-dss"}>
            <img src={pcidss} alt={""}/>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Authentication;