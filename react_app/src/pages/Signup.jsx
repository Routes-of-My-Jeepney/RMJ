import React, { useState } from "react";
import axios from "axios";

export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/register`,
                {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password,
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signup}>Sign Up</button>
        </div>
    );
}
