import React from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    // Fetch the list of posts from the backend API
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send a POST request to the /api/posts endpoint with the post data
    axios.post('/api/posts', {
      title,
      author,
      content,
    })
      .then((res) => {
        // The response will contain the created post
        const post = res.data;
        // Add the created post to the list of posts
        setPosts([...posts, post]);
        // Clear the form input fields
        setTitle('');
        setAuthor('');
        setContent('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="app">
      <h1 className="app-title">My Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
            <p className="post-author">By {post.author}</p>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
