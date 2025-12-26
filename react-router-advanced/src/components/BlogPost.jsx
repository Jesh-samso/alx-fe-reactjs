import { useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();

  return <h2>Blog Post ID: {id}</h2>;
}

export default BlogPost;
