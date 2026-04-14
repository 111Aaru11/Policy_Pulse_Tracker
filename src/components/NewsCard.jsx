import React, { useState } from 'react'
import './NewsCard.css'

function NewsCard({ news }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getSourceIcon = (source) => {
    // Map common news sources to icons
    const icons = {
      'BBC': 'fa-globe',
      'Reuters': 'fa-newspaper',
      'AP': 'fa-file-text',
      'Times': 'fa-clock',
      'News': 'fa-newspaper'
    }
    return icons[source] || 'fa-globe'
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const truncatedText = news.text?.length > 150 
    ? news.text.substring(0, 150) + '...' 
    : news.text

  return (
    <div className={`news-card animate-fade-in ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-header">
        <div className="source-info">
          <div className="source-icon">
            <i className={`fas ${getSourceIcon(news.source)}`}></i>
          </div>
          <div>
            <p className="source-name">{news.source || 'News'}</p>
            <p className="publish-date">{formatDate(news.date || new Date())}</p>
          </div>
        </div>
      </div>

      {news.thumbnail && (
        <div className="card-thumbnail">
          <img src={news.thumbnail} alt="News thumbnail" />
        </div>
      )}

      <div className="card-content">
        <p className={`news-text ${isExpanded ? 'full' : 'truncated'}`}>
          {isExpanded ? news.text : truncatedText}
        </p>

        {!isExpanded && news.text?.length > 150 && (
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(true)}
          >
            <span>Show more</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        )}

        {isExpanded && (
          <button 
            className="expand-btn collapse"
            onClick={() => setIsExpanded(false)}
          >
            <span>Show less</span>
            <i className="fas fa-chevron-up"></i>
          </button>
        )}
        
      </div>
    </div>
  )
}

export default NewsCard
