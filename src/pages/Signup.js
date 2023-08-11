import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Signup.css'; // Import custom CSS file

export default function Signup(props) {
  // State to manage signup form fields
  const [signup, setSignup] = useState({ name: '', email: '', password: '', cpassword: '' });
  
  const navigate = useNavigate(); // Navigation hook for redirecting
  
  const host = 'https://inotebook-backend.glitch.me'; // API server base URL

  // Event handler for signup button click
  const handleClick = async (e) => {
    e.preventDefault();
   
console.log( JSON.stringify({ name: signup.name, email: signup.email, password: signup.password }))

    // API call to createUser endpoint
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: signup.name, email: signup.email, password: signup.password }),
    });
    
    const json = await response.json(); // Response data in JSON format
    
    if (json.success) {
      // Save auth token and redirect to home page
      localStorage.setItem('token', json.authToken);
      navigate('/', { replace: true });
      props.showAlert('Account created successfully', 'success');
    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
  };

  // Event handler for input field changes
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
    </div>
  );
}


// The Signup component is a form that allows users to create a new account. Here's a summary of its functionality:

// It uses the useState hook to manage form fields' state.
// The useNavigate hook is used for navigation to redirect the user.
// The component makes an API call to the /api/auth/createUser endpoint when the signup button is clicked.
// The form fields are controlled components, meaning their values are derived from the signup state and any changes update the state.
// After a successful API response, the user's authentication token is saved in the local storage, and the user is redirected to the home page.
// If the API response indicates invalid credentials, an alert is shown to the user.
// The component renders a form with input fields for username, email, password, and confirm password.
// The form submission is triggered by clicking the "Sign Up" button, which calls the handleClick event handler.
// Custom CSS classes are applied to style the form.