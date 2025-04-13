// client/src/components/Admin/BlogPostForm.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createBlogPost, updateBlogPost } from '../../services/api';
import { BlogPost } from '../../types/blog';

interface BlogPostFormProps {
  initialData?: Partial<BlogPost>;
  onSuccess: () => void;
  onCancel: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ 
  initialData, 
  onSuccess, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    date: new Date().toISOString().split('T')[0],
    categories: [],
    tags: [],
    readTime: 5,
    featured: false,
    ...initialData
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  // 标题改变时自动生成 slug
  useEffect(() => {
    if (!initialData?.slug && formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: formData.title || ''
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      }));
    }
  }, [formData.title, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 确保文章ID
      if (!formData.id) {
        formData.id = Date.now().toString();
      }

      // 确保作者信息
      if (!formData.author) {
        formData.author = {
          name: "Taylor Zhu",
          avatar: "/profile_pic.jpg"
        };
      }
      
      if (initialData?.id) {
        // 更新文章
        await updateBlogPost(initialData.id, formData as BlogPost);
      } else {
        // 创建新文章
        await createBlogPost(formData as BlogPost);
      }
      
      onSuccess();
    } catch (err) {
      console.error('Error saving post:', err);
      setError('Failed to save blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };

  const addCategory = () => {
    if (categoryInput.trim() && !formData.categories?.includes(categoryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...(prev.categories || []), categoryInput.trim()]
      }));
      setCategoryInput('');
    }
  };

  const removeCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories?.filter(c => c !== category) || []
    }));
  };

  return (
    <div className="blog-post-form-container">
      <motion.div 
        className="blog-post-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-header">
          <h2>{initialData?.id ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
        </div>
        
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="slug">Slug*</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="enter-post-slug"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Publish Date*</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date?.toString().split('T')[0]}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="readTime">Read Time (min)*</label>
              <input
                type="number"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                min="1"
                max="60"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                Featured Post
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image URL*</label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt*</label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief description of the post"
              rows={3}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Content*</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog post content here (Markdown supported)"
              rows={12}
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Tags</label>
              <div className="tag-input-container">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag"
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  onClick={addTag}
                  disabled={isSubmitting || !tagInput.trim()}
                >
                  Add
                </button>
              </div>
              <div className="tags-container">
                {formData.tags?.map(tag => (
                  <span key={tag} className="tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Categories</label>
              <div className="tag-input-container">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                  placeholder="Add category"
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  onClick={addCategory}
                  disabled={isSubmitting || !categoryInput.trim()}
                >
                  Add
                </button>
              </div>
              <div className="tags-container">
                {formData.categories?.map(category => (
                  <span key={category} className="tag category-tag">
                    {category}
                    <button type="button" onClick={() => removeCategory(category)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  {initialData?.id ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                initialData?.id ? 'Update Post' : 'Create Post'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BlogPostForm;
