import React, { useState } from 'react'
import './Header.css'

function Header({ selectedDomain, onDomainChange, onSearch, searchQuery, onFilterToggle }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const allDomains = [
    { name: 'Health', icon: 'fa-heartbeat', color: '#ec4899' },
    { name: 'Education', icon: 'fa-book', color: '#8b5cf6' },
    { name: 'Finance', icon: 'fa-money-bill-wave', color: '#3b82f6' },
    { name: 'Transport', icon: 'fa-bus', color: '#06b6d4' },
    { name: 'Agriculture', icon: 'fa-leaf', color: '#22c55e' },
    { name: 'Business', icon: 'fa-briefcase', color: '#f59e0b' },
    { name: 'Environment', icon: 'fa-tree', color: '#10b981' },
    { name: 'Sports', icon: 'fa-trophy', color: '#f97316' }
  ]

  const visibleDomains = allDomains.slice(0, 3)
  const hiddenDomains = allDomains.slice(3)

  const handleDomainChange = (domain) => {
    onDomainChange(domain)
    setShowDropdown(false)
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="logo">
            <i className="fas fa-chart-line"></i> Policy Pulse AI
          </h1>
        </div>

        <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="Search policies, news, reforms..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setIsSearchOpen(false)}
          />
          <i 
            className="fas fa-sliders-h filter-icon"
            onClick={onFilterToggle}
            title="Open filters"
          ></i>
        </div>
      </div>

      <nav className="navigation">
        {visibleDomains.map(domain => (
          <button 
            key={domain.name}
            className={`nav-btn ${selectedDomain === domain.name ? 'active' : ''}`}
            onClick={() => handleDomainChange(domain.name)}
            style={{'--color': domain.color}}
          >
            <i className={`fas ${domain.icon}`}></i>
            <span>{domain.name}</span>
          </button>
        ))}
        
        <div className="domains-dropdown-container">
          <button 
            className="nav-btn more-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <i className="fas fa-ellipsis-h"></i>
            <span>More</span>
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              {hiddenDomains.map(domain => (
                <button
                  key={domain.name}
                  className={`dropdown-item ${selectedDomain === domain.name ? 'active' : ''}`}
                  onClick={() => handleDomainChange(domain.name)}
                  style={{'--color': domain.color}}
                >
                  <i className={`fas ${domain.icon}`}></i>
                  <span>{domain.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
