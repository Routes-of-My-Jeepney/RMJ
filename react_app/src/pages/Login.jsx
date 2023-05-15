import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {

    const Submit = (e) => {
        e.preventDefault();

    };

    return (
        <div>
            <h1>Login</h1>
            <div className="login">
                <form className="login__form" onSubmit={Submit}>
                    <div className="login__form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" className="login__form-input" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="login__form-input" />
                        <button type="submit" className="login__form-button">Login</button>
                        <p>Don't have an account? <Link to="/signup">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}
