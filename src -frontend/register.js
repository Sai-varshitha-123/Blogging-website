import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; // Import the external CSS file
import Login from './login'; // Import Login component if not already imported

function Register() {
    const [isRegister, setIsRegister] = useState(false);
    const [displayname, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handle = async () => {
        const user = {
            displayname: displayname,
            email: email,
            name: name,
            password: password
        };
        try {
            const response = await axios.post("http://localhost:5000/register", user);
            const { message } = response.data;
            if (response.status === 201) {
                setIsRegister(true);
            }
            alert(message);
        } catch (err) {
            console.log(err);
        }
    };

    return isRegister ? <Login /> : (
        <div className="register-container">
            <h1>Register to Blogger</h1>
            <label className="input-label">Username:
                <input type="text" value={displayname} onChange={(e) => setUsername(e.target.value)} required />
            </label><br />
            <label className="input-label">Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label><br />
            <label className="input-label">Full Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label><br />
            <label className="input-label">Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label><br />
            <button className="register-button" onClick={handle}>Register</button>
        </div>
    );
}

export default Register;
