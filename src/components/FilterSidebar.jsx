import React, { useState } from 'react'
import './FilterSidebar.css'

function FilterSidebar({ isOpen, onClose, filters, onFilterChange }) {
  const sentimentOptions = ['All', 'Positive', 'Negative', 'Neutral']
  const sourceOptions = ['All Sources', 'BBC', 'Reuters', 'AP', 'Times', 'News']

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Filters</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="sidebar-content">
          {/* Sentiment Filter */}
          <div className="filter-group">
            <label className="filter-label">
              <i className="fas fa-heart"></i> Sentiment
            </label>
            <div className="filter-options">
              {sentimentOptions.map(option => (
                <label key={option} className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.sentiment.includes(option)}
                    onChange={() => {
                      const updated = filters.sentiment.includes(option)
                        ? filters.sentiment.filter(s => s !== option)
                        : [...filters.sentiment, option]
                      onFilterChange('sentiment', updated)
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Source Filter */}
          <div className="filter-group">
            <label className="filter-label">
              <i className="fas fa-globe"></i> News Source
            </label>
            <div className="filter-options">
              {sourceOptions.map(option => (
                <label key={option} className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.sources.includes(option)}
                    onChange={() => {
                      const updated = filters.sources.includes(option)
                        ? filters.sources.filter(s => s !== option)
                        : [...filters.sources, option]
                      onFilterChange('sources', updated)
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Policy Type Filter */}
          <div className="filter-group">
            <label className="filter-label">
              <i className="fas fa-list"></i> Policy Type
            </label>
            <div className="filter-options">
              {['All Types', 'Reform', 'Amendment', 'Proposed', 'Active'].map(option => (
                <label key={option} className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={filters.types.includes(option)}
                    onChange={() => {
                      const updated = filters.types.includes(option)
                        ? filters.types.filter(t => t !== option)
                        : [...filters.types, option]
                      onFilterChange('types', updated)
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="filter-group">
            <label className="filter-label">
              <i className="fas fa-sort"></i> Sort By
            </label>
            <select 
              className="sort-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="sentiment-high">Most Positive</option>
              <option value="sentiment-low">Most Negative</option>
              <option value="trending">Trending</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button className="clear-filters-btn" onClick={() => {
            onFilterChange('reset', true)
          }}>
            <i className="fas fa-redo"></i> Clear All Filters
          </button>
        </div>
      </aside>
    </>
  )
}

export default FilterSidebar
