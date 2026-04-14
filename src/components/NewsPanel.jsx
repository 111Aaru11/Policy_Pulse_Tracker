import React, { useState, useEffect } from 'react'
import NewsCard from './NewsCard'
import { API_ENDPOINTS } from '../config/api'
import './NewsPanel.css'

function NewsPanel({ selectedDomain, searchQuery }) {
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews(selectedDomain)
  }, [selectedDomain])

  const fetchNews = async (domain) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ENDPOINTS.NEWS}?domain=${domain}`)
      const data = await response.json()
      
      const formattedNews = data.map(item => ({
        text: item.text,
        sentiment: item.sentiment[0]?.label || 'NEUTRAL',
        score: item.sentiment[0]?.score || 0.5,
        source: item.source || 'News',
        date: item.date || new Date(),
        thumbnail: item.thumbnail || null
      }))
      
      setNewsList(formattedNews)
    } catch (error) {
      console.error('Error fetching news:', error)
      setNewsList([])
    } finally {
      setLoading(false)
    }
  }

  const filteredNews = newsList.filter(news =>
    news.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="news-panel">
      <div className="panel-header">
        <div className="header-title">
          <i className="fas fa-newspaper"></i>
          <h2>Latest News & Updates</h2>
        </div>
        <span className="news-count">{filteredNews.length} news</span>
      </div>

      <div className="news-container">
        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading news...</p>
          </div>
        ) : filteredNews.length > 0 ? (
          filteredNews.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))
        ) : (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <p>No news available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsPanel
