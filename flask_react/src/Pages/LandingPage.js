import React, { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const generateError = (err) => {
    console.log(err);
    if (err.response.data.error) {
      toast.error(err.response.data.error, {
        position: 'bottom-right',
      });
    } else {
      toast.error('User already registered!', {
        position: 'bottom-right',
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('jwt');
      const response = await axios
        .post('http://localhost:5000', { jwt: token })
        .then((result) => {
          console.log('logged in');
        })
        .catch((err) => generateError(err));
    }
    fetchData();
  });

  let navigate = useNavigate();
  const routeChange = () => {
    navigate('/Home');
  };

  return (
    <div className="landing-page">
      <div className="landing-page-left-box">
        <h1>
          Welcome to <span className="landing-page-title">Beeline</span>
        </h1>
        <p className="landing-page-para">
          Beeline takes the materials you commonly use in your courses and
          generates a number of questions that can help supplement your
          studying. Note that the more relevant resources you upload, the more
          accurate and relevant your Beeline will be.
        </p>
        <Button variant="custom" onClick={routeChange}>
          Let's Get Started
        </Button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LandingPage;
