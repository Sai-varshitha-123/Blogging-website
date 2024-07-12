import React, { useState } from "react";
import Login from '../login';
import Register from '../register';

function LandingPage() {
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {login ? (
                <Login />
            ) : signUp ? (
                <Register />
            ) : (
                <div>
                    <h1 style={{ color: '#333' }}>Blogger</h1>

                    <button style={{ marginRight: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }} onClick={() => setLogin(true)}>Login</button>
                    <button style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }} onClick={() => setSignUp(true)}>Sign Up</button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
