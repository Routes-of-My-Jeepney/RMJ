import React from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {

    const Submit = (e) => {
        e.preventDefault();
    };
    
    return (
        <div>
        <h1>Signup</h1>
        <div className="login">
            <form className="login__form" onSubmit={Submit}>
                <div className="login__form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className="login__form-input" />
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" className="login__form-input" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="login__form-input" />
                    <label htmlFor="password confirmation">Password confirmation</label>
                    <input type="password" name="password confirmation" id="password confirmation" className="login__form-input" />
                    <button type="submit" className="login__form-button">Singup</button>
                    <p>
                        Already Registered?
                        <Link to="/login">Sign in</Link></p>
                </div>
            </form>
        </div>
    </div>
    );
}