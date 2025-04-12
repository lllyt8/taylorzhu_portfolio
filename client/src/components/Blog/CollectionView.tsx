import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogCollections } from '../../data/blog/collectionsData';
import { blogPosts } from '../../data/blog/blogData';
import { BlogCollection, BlogPost } from '../../types/blog';

interface CollectionViewProps {
  collectionId: string;
  onBack: () => void;
  onSelectPost: (postId: string) => void;
}

const CollectionView = ({ collectionId, onBack, onSelectPost }: CollectionViewProps) => {
  const [collection, setCollection] = useState<BlogCollection | null>(null);
  const [posts, setPosts] = useState<Record<string, BlogPost[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // 查找匹配的合集
    const foundCollection = blogCollections.find(c => c.id === collectionId);
    
    if (foundCollection) {
      setCollection(foundCollection);
      
      // 整理文章数据
      const postsMap: Record<string, BlogPost[]> = {};
      
      foundCollection.chapters.forEach(chapter => {
        postsMap[chapter.id] = chapter.articles
          .map(articleId => blogPosts.find(post => post.id === articleId))
          .filter((post): post is BlogPost => post !== undefined);
      });
      
      setPosts(postsMap);
    }
    
    setLoading(false);
  }, [collectionId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!collection) {
    return (
      <div className="not-found">
        <h2>Collection not found</h2>
        <button onClick={onBack} className="back-button">Back to Blog</button>
      </div>
    );
  }

  return (
    <motion.div 
      className="collection-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={onBack} className="back-button">
        &larr; Back to Blog
      </button>
      
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
        {collection.chapters.map(chapter => (
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
                  onClick={() => onSelectPost(post.id)}
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
