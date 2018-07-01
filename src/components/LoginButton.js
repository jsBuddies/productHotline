import React from 'react';

const LoginButton = (props) => {
    const buttonText = (props.loggedIn === true ? 'Logout' : 'Login');
    const buttonHandler = (props.loggedIn === true ? props.logout : props.loginWithGoogle);

    return <button onClick={buttonHandler} className="button button--login">{buttonText}</button>
}

export default LoginButton;