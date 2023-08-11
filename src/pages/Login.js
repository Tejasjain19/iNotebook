import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css'; // Import custom CSS file

export default function Login(props) {
  // State to manage login form fields
  const [login, setLogin] = useState({ email: '', password: '' });
  
  const navigate = useNavigate(); // Navigation hook for redirecting
  
  const host = 'https://inotebook-backend.glitch.me'; // API server base URL

  // Event handler for login button click
  const handleClick = async (e) => {
    e.preventDefault();

    // API call to login endpoint
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: login.email, password: login.password }),
    });
    
    const json = await response.json(); // Response data in JSON format
    
    if (json.success) {
      // Save auth token and redirect to home page
      localStorage.setItem('token', json.authToken);
      navigate('/', { replace: true });
      props.showAlert('Login successfully', 'success');
    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
  };

  // Event handler for input field changes
  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5 login-box">
      <h3 className="text-center mb-4">Login to continue to iNotebook</h3>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={login.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={login.password}
            onChange={onChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}


// The Login component is a functional component that handles the login functionality.
// It uses the useState hook to manage the login state, which contains the email and password fields.
// The useNavigate hook from react-router-dom is used to handle navigation.
// The host variable represents the base URL of the API server.
// The handleClick function is an event handler that is called when the login button is clicked.
// Inside the handleClick function, an API call is made to the server's login endpoint using the fetch function.
// The email and password are sent in the request body as JSON.
// If the login is successful (json.success is true), the authentication token is stored in the local storage, and the user is redirected to the home page (/) using the navigate function.
// If the login fails, an alert is displayed with the message "Invalid credentials".
// The onChange function is an event handler that updates the login state when the email or password input fields change.
// The component renders a login form with email and password input fields.
// The value of the input fields is bound to the login state.
// The onClick event of the login button is set to the handleClick function.
// The form has basic validation and error messages.
// When the login button is clicked, the handleClick function is called.
// Overall, the code handles user input for email and password, makes an API call to the server for login, and handles success or failure scenarios by storing the authentication token and displaying appropriate alerts.