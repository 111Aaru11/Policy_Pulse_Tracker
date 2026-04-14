import React from 'react'
import './SentimentBadge.css'

function SentimentBadge({ sentiment, score }) {
  const getSentimentConfig = (type) => {
    const configs = {
      POSITIVE: { icon: 'fa-thumbs-up', color: '#22c55e', label: 'Positive' },
      NEGATIVE: { icon: 'fa-thumbs-down', color: '#ef4444', label: 'Negative' },
      NEUTRAL: { icon: 'fa-minus', color: '#8b5cf6', label: 'Neutral' }
    }
    return configs[type] || configs.NEUTRAL
  }

  const config = getSentimentConfig(sentiment)
  const percentage = Math.round(score * 100)

  return (
    <div className="sentiment-badge" style={{ '--sentiment-color': config.color }}>
      <div className="badge-header">
        <i className={`fas ${config.icon}`}></i>
        <span className="badge-label">{config.label}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="percentage">{percentage}%</span>
    </div>
  )
}

export default SentimentBadge
