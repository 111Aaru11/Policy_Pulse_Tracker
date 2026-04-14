import React from 'react'
import './DashboardSection.css'

function DashboardSection({ selectedDomain }) {
  const dashboardStats = [
    { icon: 'fa-scroll', title: 'Total Policies', value: '342', trend: '+12%', color: '#ec4899' },
    { icon: 'fa-chart-bar', title: 'Most Active', value: selectedDomain, trend: 'This Month', color: '#8b5cf6' },
    { icon: 'fa-smile', title: 'Avg Sentiment', value: '78%', trend: 'Positive', color: '#22c55e' }
  ]

  return (
    <section className="dashboard-section">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Policy Dashboard</h2>
        
        <div className="stats-grid">
          {dashboardStats.map((stat, index) => (
            <div key={index} className="stat-card animate-slide-in" style={{ '--delay': `${index * 0.1}s`, '--color': stat.color }}>
              <div className="stat-card-icon">
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div className="stat-card-content">
                <p className="stat-card-title">{stat.title}</p>
                <p className="stat-card-value">{stat.value}</p>
                <span className="stat-card-trend">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DashboardSection
