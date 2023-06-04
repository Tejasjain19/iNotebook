import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Signup.css'; // Import custom CSS file

export default function Signup(props) {
  const [signup, setSignup] = useState({ name: '', email: '', password: '', cpassword: '' });
  const navigate = useNavigate();
  const host = 'http://localhost:5000';

  const handleClick = async (e) => {
    e.preventDefault();

    // API call
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: signup.name, email: signup.email, password: signup.password }),
    });
    const json = await response.json();
    if (json.success) {
      // Save auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/', { replace: true });
      props.showAlert('Account created successfully', 'success');
    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
  };

  const onChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
       <div className="signup-box">                                             
      <h4 className="text-center mb-4">Create Your iNotebook Account</h4>
      <form>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input type="text" className="form-control" id="name" name="name" value={signup.name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={signup.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={signup.password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={signup.cpassword}
            onChange={onChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Sign Up
        </button>
      </form>
    </div>
    /</div>
  );
}
