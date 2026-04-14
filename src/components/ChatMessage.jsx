import React from 'react'
import './ChatMessage.css'

function ChatMessage({ message, isUser }) {
  const [displayedText, setDisplayedText] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(!isUser)

  React.useEffect(() => {
    if (!isUser && isTyping) {
      let index = 0
      const timer = setInterval(() => {
        if (index < message.text.length) {
          setDisplayedText(prev => prev + message.text[index])
          index++
        } else {
          setIsTyping(false)
        }
      }, 20) // Typing speed
      return () => clearInterval(timer)
    } else {
      setDisplayedText(message.text)
    }
  }, [message, isUser])

  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'} animate-message-in`}>
      {!isUser && (
        <div className="bot-avatar">
          <i className="fas fa-robot"></i>
        </div>
      )}
      <div className="message-content">
        <p>{displayedText}{!isUser && isTyping && <span className="typing-cursor">|</span>}</p>
      </div>
    </div>
  )
}

export default ChatMessage
