import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import { motion, AnimatePresence } from 'framer-motion';
import MicroservicesDemo from './MicroservicesDemo';
import '../styles/services-page.css';

const ServicesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 20;
    controls.minDistance = 5;

    // Create service nodes
    const services = [
      {
        title: 'Full Stack Development',
        position: new THREE.Vector3(-4, 2, 0),
        color: 0x4CAF50
      },
      {
        title: 'Performance Optimization',
        position: new THREE.Vector3(4, 2, 0),
        color: 0x2196F3
      },
      {
        title: 'Technical Consulting',
        position: new THREE.Vector3(0, -4, 0),
        color: 0x9C27B0
      },
      {
        title: 'Microservices Architecture',
        position: new THREE.Vector3(-2, -2, 4),
        color: 0xFF9800
      }
    ];

    services.forEach(service => {
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: service.color,
        emissive: service.color,
        emissiveIntensity: 0.5,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(service.position);
      scene.add(sphere);

      // Add glowing effect
      const glowGeometry = new THREE.SphereGeometry(0.7, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color(service.color) },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
            gl_FragColor = vec4(glowColor, intensity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(glowMesh);

      // Add connecting lines
      services.forEach(targetService => {
        if (service !== targetService) {
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x4CAF50,
            transparent: true,
            opacity: 0.2,
          });
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            service.position,
            targetService.position,
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
        }
      });
    });

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
      colors[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0005;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  const services = [
    {
      title: 'Full Stack Development',
      description: 'End-to-end web applications with modern technologies.',
      details: [
        'React/Node.js Applications',
        'RESTful & GraphQL APIs',
        'Database Design & Optimization',
        'Responsive Web Design'
      ]
    },
    {
      title: 'Performance Optimization',
      description: 'Enhance system performance and user experience.',
      details: [
        'Frontend Load Time Optimization',
        'Database Query Optimization',
        'Caching Strategies',
        'Performance Monitoring'
      ]
    },
    {
      title: 'Technical Consulting',
      description: 'Expert guidance on technology decisions.',
      details: [
        'Architecture Design',
        'Technology Stack Selection',
        'Code Reviews & Best Practices',
        'Team Training & Mentoring'
      ]
    },
    {
      title: 'Microservices Architecture',
      description: 'Design and implementation of scalable microservices.',
      details: [
        'Service Decomposition',
        'API Gateway Design',
        'Service Discovery',
        'Container Orchestration'
      ],
      hasDemo: true
    }
  ];

  return (
    <div className="services-page">
      {/* <motion.div 
        className="services-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Explore my professional services in the tech galaxy</h1>
      </motion.div> */}
      
      <div className="scene-container" ref={containerRef} />
      
      <div className="services-info">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className={`service-card ${service.hasDemo ? 'demo-card' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            onClick={() => service.hasDemo && setShowDemo(true)}
          >
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
            {service.hasDemo && (
              <button className="demo-button">Launch Demo</button>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showDemo && (
          <motion.div 
            className="demo-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="demo-modal-content">
              <button 
                className="close-button"
                onClick={() => setShowDemo(false)}
              >
                ×
              </button>
              <MicroservicesDemo />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesPage;
