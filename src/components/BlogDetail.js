import { useHistory ,useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react"
import useFetch from './useFetch'
import ScrollButton from "./ScrollButton";
const BlogDetail = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const {id} = useParams();
    const { data:blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, { 
            method: 'DELETE',
        }).then(() => {
            history.push('/');
        })
    }

    const handleEdit = () => {
        const blogs = {id, title, body, author}
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(blogs)
        }).then(() => {
            console.log(blogs)
            history.go(-1);
        })
    }       

    return ( 

        <div className="blog-details">
            <ScrollButton/>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article className="">
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <Link 
                        to={`/edit/${blog.id}`}
                        style = {{
                        color: "#fff",
                        backgroundColor: '#f1356d',
                        borderRadius: '8px'
                        }}
                    >Edit</Link>
                    <button onClick={handleDelete} >Delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetail;