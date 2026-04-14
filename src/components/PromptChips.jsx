import React from 'react'
import './PromptChips.css'

function PromptChips({ onPromptSelect }) {
  const prompts = [
    { text: 'What changed in 2024?', icon: 'fa-calendar' },
    { text: 'Compare health policies', icon: 'fa-balance-scale' },
    { text: 'Key reforms this year', icon: 'fa-sparkles' },
    { text: 'Latest announcements', icon: 'fa-megaphone' }
  ]

  return (
    <div className="prompt-chips">
      <p className="chips-label">Try asking:</p>
      <div className="chips-container">
        {prompts.map((prompt, index) => (
          <button 
            key={index}
            className="prompt-chip"
            onClick={() => onPromptSelect(prompt.text)}
          >
            <i className={`fas ${prompt.icon}`}></i>
            <span>{prompt.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PromptChips
