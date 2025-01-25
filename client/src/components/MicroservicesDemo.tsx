import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/microservices-demo.css';

interface Service {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'failed';
  load: number;
  connections: string[];
}

interface Message {
  id: string;
  from: string;
  to: string;
  status: 'sending' | 'success' | 'failed';
  timestamp: number;
}

const MicroservicesDemo = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 'auth',
      name: 'Authentication Service',
      status: 'healthy',
      load: 30,
      connections: ['api', 'user']
    },
    {
      id: 'user',
      name: 'User Service',
      status: 'healthy',
      load: 45,
      connections: ['auth', 'db']
    },
    {
      id: 'api',
      name: 'API Gateway',
      status: 'healthy',
      load: 60,
      connections: ['auth', 'user', 'db']
    },
    {
      id: 'db',
      name: 'Database Service',
      status: 'healthy',
      load: 25,
      connections: ['user', 'api']
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Simulate service load changes
  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prevServices => 
        prevServices.map(service => ({
          ...service,
          load: Math.min(100, Math.max(0, service.load + (Math.random() - 0.5) * 20))
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate service communication
  useEffect(() => {
    const interval = setInterval(() => {
      const service1 = services[Math.floor(Math.random() * services.length)];
      const service2 = services.find(s => 
        service1.connections.includes(s.id) && s.id !== service1.id
      );

      if (service1 && service2) {
        const newMessage: Message = {
          id: Math.random().toString(),
          from: service1.id,
          to: service2.id,
          status: 'sending',
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, newMessage]);

        // Simulate message completion
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id 
                ? { ...msg, status: Math.random() > 0.1 ? 'success' : 'failed' }
                : msg
            )
          );
        }, 1000);

        // Clean up old messages
        setMessages(prev => prev.filter(msg => 
          Date.now() - msg.timestamp < 5000
        ));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [services]);

  // Simulate service failures
  const simulateFailure = (serviceId: string) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === serviceId
          ? { ...service, status: 'failed' }
          : service
      )
    );

    // Auto recovery after 5 seconds
    setTimeout(() => {
      setServices(prevServices =>
        prevServices.map(service =>
          service.id === serviceId
            ? { ...service, status: 'healthy' }
            : service
        )
      );
    }, 5000);
  };

  return (
    <div className="microservices-demo">
      <div className="demo-controls">
        <h2>Microservices Architecture Demo</h2>
        <p>Click on any service to simulate failure and observe system behavior</p>
      </div>

      <div className="services-map">
        {services.map(service => (
          <motion.div
            key={service.id}
            className={`service-node ${service.status} ${selectedService === service.id ? 'selected' : ''}`}
            onClick={() => simulateFailure(service.id)}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>{service.name}</h3>
            <div className="service-status">
              <div className="status-indicator" />
              {service.status}
            </div>
            <div className="load-bar">
              <div 
                className="load-fill"
                style={{ width: `${service.load}%` }}
              />
            </div>
            <div className="load-label">{Math.round(service.load)}% load</div>
          </motion.div>
        ))}

        {/* Connection lines */}
        <svg className="connections">
          {services.flatMap(service =>
            service.connections.map(targetId => {
              const targetService = services.find(s => s.id === targetId);
              if (!targetService) return null;

              const message = messages.find(
                m => (m.from === service.id && m.to === targetId) ||
                     (m.from === targetId && m.to === service.id)
              );

              return (
                <g key={`${service.id}-${targetId}`}>
                  <line
                    className={`connection ${message?.status || ''}`}
                    x1={service.id === 'api' ? '50%' : service.id === 'auth' ? '25%' : service.id === 'user' ? '75%' : '50%'}
                    y1={service.id === 'api' ? '25%' : service.id === 'db' ? '75%' : '50%'}
                    x2={targetId === 'api' ? '50%' : targetId === 'auth' ? '25%' : targetId === 'user' ? '75%' : '50%'}
                    y2={targetId === 'api' ? '25%' : targetId === 'db' ? '75%' : '50%'}
                  />
                  {message && (
                    <motion.circle
                      className={`message ${message.status}`}
                      r="4"
                      initial={{
                        cx: service.id === 'api' ? '50%' : service.id === 'auth' ? '25%' : service.id === 'user' ? '75%' : '50%',
                        cy: service.id === 'api' ? '25%' : service.id === 'db' ? '75%' : '50%'
                      }}
                      animate={{
                        cx: targetId === 'api' ? '50%' : targetId === 'auth' ? '25%' : targetId === 'user' ? '75%' : '50%',
                        cy: targetId === 'api' ? '25%' : targetId === 'db' ? '75%' : '50%'
                      }}
                      transition={{ duration: 1 }}
                    />
                  )}
                </g>
              );
            })
          )}
        </svg>
      </div>

      <div className="metrics-panel">
        <h3>System Metrics</h3>
        <div className="metrics-grid">
          {services.map(service => (
            <div key={service.id} className="metric-card">
              <h4>{service.name}</h4>
              <div className="metric-stats">
                <div>Status: <span className={service.status}>{service.status}</span></div>
                <div>Load: {Math.round(service.load)}%</div>
                <div>Connections: {service.connections.length}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MicroservicesDemo;
