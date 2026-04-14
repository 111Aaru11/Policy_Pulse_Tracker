import React, { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import PromptChips from './PromptChips'
import { API_ENDPOINTS } from '../config/api'
import './ChatPanel.css'

function ChatPanel({ selectedDomain, dateRange, onDateRangeChange }) {
  const [localDomain, setLocalDomain] = useState(selectedDomain)
  const [messages, setMessages] = useState([{
    text: `Hi! I'm your AI Policy Assistant. Ask me about ${selectedDomain} policies, reforms, and government initiatives. You can ask about specific years, compare policies, or get the latest updates!`,
    isUser: false
  }])
  const [input, setInput] = useState('')
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const allDomains = [
    'Health', 'Education', 'Finance', 'Transport', 
    'Agriculture', 'Business', 'Environment', 'Sports'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setLocalDomain(selectedDomain)
  }, [selectedDomain])

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim() || !year) return

    const userMessage = {
      text: messageText,
      isUser: true
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          domain: localDomain || selectedDomain, 
          year: parseInt(year),
          query: messageText 
        })
      })

      const data = await response.json()

      const botMessage = {
        text: data.response || 'Sorry, I couldn\'t process that request. Please try again.',
        isUser: false
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = {
        text: 'Connection error. Please check if the backend is running on http://127.0.0.1:5000',
        isUser: false
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handlePromptSelect = (prompt) => {
    setInput(prompt)
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chatbot-avatar-header">
          <div className="avatar-circle">
            <i className="fas fa-robot"></i>
          </div>
          <div className="header-info">
            <h2>AI Policy Assistant</h2>
            <p>Ask anything about policies & reforms</p>
          </div>
        </div>
      </div>

      <div className="chat-controls">
        <div className="control-group">
          <label htmlFor="domain-select"><i className="fas fa-layer-group"></i> Domain</label>
          <select
            id="domain-select"
            value={localDomain}
            onChange={(e) => setLocalDomain(e.target.value)}
          >
            {allDomains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="year-input"><i className="fas fa-calendar-alt"></i> Year</label>
          <input
            id="year-input"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2024"
            min="2000"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} isUser={msg.isUser} />
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>Analyzing policies...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <PromptChips onPromptSelect={handlePromptSelect} />

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          placeholder="Ask about policies, reforms, or government initiatives..."
          disabled={isLoading}
        />
        <button 
          onClick={() => handleSendMessage()}
          disabled={isLoading || !input.trim()}
          className="send-btn"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
