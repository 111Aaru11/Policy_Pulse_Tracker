import React from 'react'
import './HeroSection.css'

function HeroSection() {
  const stats = [
    { icon: 'fa-file-alt', label: 'Policies Tracked', value: '1,240' },
    { icon: 'fa-layer-group', label: 'Domains', value: '8' },
    { icon: 'fa-sync-alt', label: 'Updated', value: 'Daily' }
  ]

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2 className="hero-title">Welcome to Policy Intelligence Hub</h2>
        <p className="hero-subtitle">Real-time analysis of government policies across 8 domains</p>
        
        <div className="stats-bar">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-icon">
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div className="stat-info">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
