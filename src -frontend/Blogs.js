import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './blogs.css'; // Import the external CSS file
import BloggerPage from './bloggerpage';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [createBlog , setCreateBlog] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to fetch blogs');
            }
        };

        fetchBlogs();
    }, []);

    return createBlog ? <BloggerPage /> : (
        <div className="blog-container">
            <button onClick={() => setCreateBlog(true)}>Create Blog</button>
            <h2>Blogs</h2>
            {error && <p>{error}</p>}
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <h3>{blog.title}</h3>
                        <p>{blog.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Blogs;
