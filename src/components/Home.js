import useFetch from "./useFetch"
import BlogList from "./BlogList"
import ScrollButton from "./ScrollButton"

const Home = () => {
    // let name = 'long';
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs')

    console.log(blogs)
    
    return ( 
        <div className="home">
            <ScrollButton />
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs } title = "All Title" />}
            {/* {blogs && <BlogTable blogs={blogs}/>} */}
            {/* <BlogList blogs={blogs.filter((blog) => blog.author === 'mario') } title = "Mario Title"/> */}
        </div>
    );
}

export default Home;