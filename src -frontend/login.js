import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import the external CSS file
import Register from './register';
import Blogs from './Blogs';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handle = async () => {
        const user = {
            email: email,
            password: password
        };
        try {
            const response = await axios.post("http://localhost:5000/login", user);
            const { message } = response.data;

            if (response.status === 200) {
                alert(message);
                setIsLogin(true);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return register ? (
        <Register />
    ) : isLogin ? <Blogs /> : (
        <div className="login-container">
            <h1>Login to Blogger</h1>
            <label className="input-label">Username:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label><br />
            <label className="input-label">Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label><br />
            <div className="login-buttons">
                <button onClick={handle}>Submit</button>
                <button onClick={() => setRegister(true)}>Register</button>
            </div>
        </div>
    );
}

export default Login;
