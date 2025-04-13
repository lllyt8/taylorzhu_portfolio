import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBlogCollections } from '../../services/api';
import { BlogCollection } from '../../types/blog';

interface CollectionsListProps {
  onSelectCollection: (collectionId: string) => void;
}

const CollectionsList = ({ onSelectCollection }: CollectionsListProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [collections, setCollections] = useState<BlogCollection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const data = await getBlogCollections();
        setCollections(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError('Failed to load collections. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollections();
  }, []);

  if (loading) {
    return <div className="loading">Loading collections...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="collections-container">
      <h2 className="collections-title">Article Collections</h2>
      <p className="collections-subtitle">Deep dives into specialized topics</p>
      
      <div className="collections-grid">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            className="collection-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredId(collection.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => onSelectCollection(collection.id)}
          >
            <div className="collection-image">
              <img src={collection.coverImage} alt={collection.title} />
              <div className="collection-overlay" style={{ 
                opacity: hoveredId === collection.id ? 0.7 : 0 
              }} />
            </div>
            
            <div className="collection-content">
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              
              <div className="collection-meta">
                <span>{collection.totalArticles} articles</span>
                <span>~{collection.estimatedReadTime} min read</span>
              </div>
              
              <div className="collection-tags">
                {collection.tags.map(tag => (
                  <span key={tag} className="collection-tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsList;
