// client/src/components/Blog/CollectionView.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogCollection, getBlogPosts } from '../../services/api';
import { BlogCollection, BlogPost, BlogChapter } from '../../types/blog';

interface CollectionViewProps {
  collectionId?: string; // 可选，兼容旧代码
  onBack?: () => void; // 可选，兼容旧代码
  onSelectPost?: (postId: string) => void; // 可选，兼容旧代码
}

const CollectionView = ({ collectionId: propCollectionId, onBack, onSelectPost }: CollectionViewProps) => {
  const { id: paramCollectionId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const collectionId = propCollectionId || paramCollectionId || '';
  
  const [collection, setCollection] = useState<BlogCollection | null>(null);
  const [posts, setPosts] = useState<Record<string, BlogPost[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCollectionAndPosts = async () => {
      try {
        setLoading(true);
        // 获取集合信息
        const collectionData = await getBlogCollection(collectionId);
        setCollection(collectionData);
        
        // 获取所有文章
        const allPosts = await getBlogPosts();
        
        // 整理文章数据
        const postsMap: Record<string, BlogPost[]> = {};
        
        collectionData.chapters.forEach((chapter: BlogChapter) => {
          postsMap[chapter.id] = chapter.articles
            .map((articleId: string) => allPosts.find((post:BlogPost) => post.id === articleId))
            .filter((post): post is BlogPost => post !== undefined);
        });
        
        setPosts(postsMap);
        setError(null);
      } catch (err) {
        console.error('Error fetching collection:', err);
        setError('Failed to load collection. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    if (collectionId) {
      fetchCollectionAndPosts();
    }
  }, [collectionId]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/blog');
    }
  };

  const handleSelectPost = (postId: string) => {
    if (onSelectPost) {
      onSelectPost(postId);
    } else {
      navigate(`/blog/post/${postId}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !collection) {
    return (
      <div className="not-found">
        <h2>{error || 'Collection not found'}</h2>
        <button onClick={handleBack} className="back-button">Back to Blog</button>
      </div>
    );
  }

  // Rest of the component remains the same
  return (
    <motion.div 
      className="collection-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={handleBack} className="back-button">
        &larr; Back to Blog
      </button>
      
      {/* Rest of the component */}
      <div className="collection-header">
        <h1>{collection.title}</h1>
        <p className="collection-description">{collection.description}</p>
        
        <div className="collection-meta">
          <div className="collection-author">
            <img src={collection.author.avatar} alt={collection.author.name} />
            <span>{collection.author.name}</span>
          </div>
          <div className="collection-info">
            <span>{collection.totalArticles} articles</span>
            <span>~{collection.estimatedReadTime} min total read time</span>
          </div>
        </div>
      </div>
      
      <div className="collection-chapters">
        {collection.chapters.map((chapter: BlogChapter) => (
          <div key={chapter.id} className="collection-chapter">
            <h2 className="chapter-title">
              {chapter.order}. {chapter.title}
            </h2>
            <p className="chapter-description">{chapter.description}</p>
            
            <div className="chapter-articles">
              {posts[chapter.id]?.map(post => (
                <motion.div 
                  key={post.id}
                  className="chapter-article"
                  whileHover={{ x: 10 }}
                  onClick={() => handleSelectPost(post.id)}
                >
                  <div className="article-order">{post.order}</div>
                  <div className="article-info">
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="article-meta">
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CollectionView;
