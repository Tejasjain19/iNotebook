import { Light } from '@mui/icons-material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    // Get the current location using the useLocation hook from react-router-dom
    let location = useLocation();

    // Get the navigate function from the useNavigate hook from react-router-dom
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        // Remove the 'token' from localStorage
        localStorage.removeItem('token');

        // Navigate to the '/login' route, replacing the current entry in the history
        navigate("/login", { replace: true });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#000080" }}>
            <div className="container-fluid">
                {/* Link to the home page */}
                <Link className="navbar-brand text-white" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* Link to the home page with active class if the current location is '/' */}
                            <Link className={`nav-link text-white ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            {/* Link to the about page with active class if the current location is '/about' */}
                            <Link className={`nav-link text-white ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? (
                        // Render login and signup buttons if 'token' is not present in localStorage
                        <form className="d-flex" role="search">
                            <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-outline-light mx-2" to="/signup" role="button">Signup</Link>
                        </form>
                    ) : (
                        // Render logout button if 'token' is present in localStorage
                        <button className="btn btn-outline-light mx-2" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;




// The Navbar component is a functional component that renders the navigation bar.
// The useLocation hook is used to get the current location, which is stored in the location variable.
// The useNavigate hook is used to get the navigate function, which is used to navigate to different routes.
// The handleLogout function is called when the logout button is clicked. It removes the 'token' from localStorage and navigates to the '/login' route, replacing the current entry in the history.
// The component returns JSX code that renders the navigation bar with links to the home and about pages. The active class is applied to the link that matches the current location.
// If the 'token' is not present in localStorage, the login and signup buttons are rendered. Otherwise, the logout button is rendered