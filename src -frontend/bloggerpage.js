import React, { useState } from 'react';
//import axios from 'axios';
import Blogs from './Blogs'; // Assuming Blogs component is defined in './Blogs'
import './blogger.css'; // Import the external CSS file

function Blogger() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [isBlogCreated, setBlogCreated] = useState(false);

    const handleCreateBlog = async () => {
        try {
            const blog = {
                title: title,
                name: description,
                content: content
            };
    
            const response = await fetch("http://localhost:5000/createblog", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blog),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Success:', data);
            setBlogCreated(true);
        } catch (error) {
            console.error('Error creating blog:', error.message);
            // Handle error state or display error message to user
        }
    };
    
    

    return isBlogCreated ? <Blogs /> : (
        <div className="blogger-container">
            <h1>Create your blog</h1>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
            <label>Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />
            <label>Content:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required /><br />

            <button onClick={handleCreateBlog}>Post</button>
        </div>
    );
}

export default Blogger;
