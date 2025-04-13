// client/src/components/Admin/AdminBlogList.tsx
import { useState, useEffect } from 'react';
import { getBlogPosts, deletePost } from '../../services/api';
import { BlogPost } from '../../types/blog';

const AdminBlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getBlogPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-blog-list">
      <h1>Manage Blog Posts</h1>
      <a href="/admin/blog/new" className="btn-add">Add New Post</a>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{new Date(post.date).toLocaleDateString()}</td>
              <td>{post.featured ? 'Yes' : 'No'}</td>
              <td>
                <a 
                  href={`/admin/blog/edit/${post.id}`} 
                  className="btn-edit"
                >
                  Edit
                </a>
                <button 
                  onClick={() => handleDelete(post.id)} 
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogList;
