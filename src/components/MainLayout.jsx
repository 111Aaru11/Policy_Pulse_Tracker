import React from 'react'
import NewsPanel from './NewsPanel'
import ChatPanel from './ChatPanel'
import './MainLayout.css'

function MainLayout({ selectedDomain, searchQuery, dateRange, onDateRangeChange }) {
  return (
    <div className="main-layout">
      <NewsPanel 
        selectedDomain={selectedDomain}
        searchQuery={searchQuery}
      />
      <ChatPanel 
        selectedDomain={selectedDomain}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
    </div>
  )
}

export default MainLayout
