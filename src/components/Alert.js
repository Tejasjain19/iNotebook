import React from 'react';

export default function Alert(props) {
    // Function to capitalize the first letter of a word
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error"; // Replace "danger" with "error" for consistency
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        // Render the alert component only if the props.alert is truthy
        props.alert && (
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                {/* Display the capitalized alert type and message */}
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>
        )
    );
}


// The Alert component is a functional component that renders an alert message.
// The capitalize function is defined to capitalize the first letter of a word. If the word is "danger", it is replaced with "error" for consistency.
// The component returns JSX code that conditionally renders the alert component based on the props.alert value.
// The alert type is used to dynamically set the CSS class of the alert component based on the props.alert.type value.
// The capitalize function is used to capitalize the props.alert.type value for display.
// The props.alert.msg is used to display the alert message.