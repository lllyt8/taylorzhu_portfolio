// client/src/components/Admin/ProjectForm.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project, ProjectCategory } from '../../types/projects';
import { createProject, updateProject } from '../../services/api';

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    id: 0,
    title: '',
    description: '',
    longDescription: '',
    image: '',
    technologies: [],
    featured: false,
    githubLink: '',
    demoLink: '',
    category: 'frontend' as ProjectCategory,
    images: [] as string[],
    details: {
      challenge: '',
      solution: '',
      result: ''
    },
    ...initialData
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [techInput, setTechInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else if (name.startsWith('details.')) {
      const detailField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        details: {
          ...(prev.details ?? { challenge: '', solution: '', result: '' }),
          [detailField]: value
        }
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
      // 确保项目ID
      if (!formData.id && formData.id !== 0) {
        // 如果是新项目，生成一个新ID
        const newId = Date.now();
        formData.id = newId;
      }

      if (initialData?.id !== undefined) {
        // 更新项目
        await updateProject(initialData.id as number, formData as Project);
      } else {
        // 创建新项目
        await createProject(formData as Project);
      }

      onSuccess();
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Failed to save project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter(t => t !== tech) || []
    }));
  };

  const addImage = () => {
    if (imageInput.trim() && !formData.images?.includes(imageInput.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), imageInput.trim()]
      }));
      setImageInput('');
    }
  };

  const removeImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images ?? []).filter((img: string) => img !== image)
    }));
  };

  return (
    <div className="project-form-container">
      <motion.div
        className="project-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-header">
          <h2>{initialData?.id !== undefined ? 'Edit Project' : 'Create New Project'}</h2>
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
              placeholder="Enter project title"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full Stack</option>
                <option value="research">Research</option>
              </select>
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
                Featured Project
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Short Description*</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the project"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="longDescription">Full Description*</label>
            <textarea
              id="longDescription"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              placeholder="Detailed description of the project"
              rows={4}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Main Image URL*</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="githubLink">GitHub Link</label>
              <input
                type="text"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/username/repo"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="demoLink">Demo Link</label>
              <input
                type="text"
                id="demoLink"
                name="demoLink"
                value={formData.demoLink}
                onChange={handleChange}
                placeholder="https://example.com/demo"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Technologies*</label>
            <div className="tag-input-container">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                placeholder="Add technology"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={addTechnology}
                disabled={isSubmitting || !techInput.trim()}
              >
                Add
              </button>
            </div>
            <div className="tags-container">
              {formData.technologies?.map(tech => (
                <span key={tech} className="tag">
                  {tech}
                  <button type="button" onClick={() => removeTechnology(tech)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Additional Images</label>
            <div className="tag-input-container">
              <input
                type="text"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                placeholder="Add image URL"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={addImage}
                disabled={isSubmitting || !imageInput.trim()}
              >
                Add
              </button>
            </div>
            <div className="images-container">
              {formData.images?.filter(img => img.trim() !== '').map((image, index) => (
                <div key={index} className="image-item">
                  <div className="image-preview">
                    <img src={image} alt={`Preview ${index}`} />
                  </div>
                  <button type="button" onClick={() => removeImage(image)}>Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Project Details</h3>

            <div className="form-group">
              <label htmlFor="details.challenge">Challenge*</label>
              <textarea
                id="details.challenge"
                name="details.challenge"
                value={formData.details?.challenge}
                onChange={handleChange}
                placeholder="What challenge did this project address?"
                rows={3}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="details.solution">Solution*</label>
              <textarea
                id="details.solution"
                name="details.solution"
                value={formData.details?.solution}
                onChange={handleChange}
                placeholder="How did you solve the challenge?"
                rows={3}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="details.result">Result*</label>
              <textarea
                id="details.result"
                name="details.result"
                value={formData.details?.result ?? ''}
                onChange={handleChange}
                placeholder="What was the outcome of the project?"
                rows={3}
                required
                disabled={isSubmitting}
              />
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
                  {initialData?.id !== undefined ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                initialData?.id !== undefined ? 'Update Project' : 'Create Project'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProjectForm;
