import { useState } from 'react';
import { motion } from 'framer-motion';
import { blogCollections } from '../../data/blog/collectionsData';
import { BlogCollection } from '../../types/blog';

interface CollectionsListProps {
  onSelectCollection: (collectionId: string) => void;
}

const CollectionsList = ({ onSelectCollection }: CollectionsListProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="collections-container">
      <h2 className="collections-title">Article Collections</h2>
      <p className="collections-subtitle">Deep dives into specialized topics</p>
      
      <div className="collections-grid">
        {blogCollections.map((collection, index) => (
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
