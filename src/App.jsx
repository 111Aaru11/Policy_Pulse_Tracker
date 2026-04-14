import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import DashboardSection from './components/DashboardSection'
import MainLayout from './components/MainLayout'
import FilterSidebar from './components/FilterSidebar'
import './App.css'

function App() {
  const [selectedDomain, setSelectedDomain] = useState('Health')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    sentiment: [],
    sources: [],
    types: [],
    sortBy: 'latest'
  })

  const handleDomainChange = (domain) => {
    setSelectedDomain(domain)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleDateRangeChange = (start, end) => {
    setDateRange({ start, end })
  }

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'reset') {
      setFilters({
        sentiment: [],
        sources: [],
        types: [],
        sortBy: 'latest'
      })
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }))
    }
  }

  return (
    <div className="app-container">
      <Header 
        selectedDomain={selectedDomain}
        onDomainChange={handleDomainChange}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onFilterToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <FilterSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <HeroSection />
      <DashboardSection selectedDomain={selectedDomain} />
      <MainLayout 
        selectedDomain={selectedDomain}
        searchQuery={searchQuery}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        filters={filters}
      />
    </div>
  )
}

export default App
