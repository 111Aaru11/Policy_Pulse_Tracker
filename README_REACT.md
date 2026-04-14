# Policy Pulse AI - React Frontend

A modern, premium React-based UI for Government Policy Intelligence & Analysis Platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Python backend running on `http://127.0.0.1:5000`

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the Flask backend** (in a separate terminal):
```bash
python app.py
```

3. **Start the development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 🎨 Features

### Premium UI Components
- ✨ Animated gradient backgrounds
- 🎯 Side-by-side layout (News & Chat)
- 📰 News cards with sentiment analysis
- 💬 AI chat assistant with typing animation
- 📊 Dashboard with stats and sentiment trends
- 🔍 Search functionality
- 📅 Year/date filters
- 🎬 Smooth animations and transitions

### Key Sections

1. **Header** - Navigation, search, and domain selection
2. **Hero Section** - Quick stats bar
3. **Dashboard** - Analytics cards and sentiment trends
4. **Main Layout**
   - Left: News Panel with filtered news cards
   - Right: Chat Panel with AI assistant

### Color Palette
- Primary: Magenta (`#ec4899`)
- Secondary: Purple (`#8b5cf6`)
- Tertiary: Blue (`#3b82f6`)
- Background: Deep Navy (`#0a0e27`)

## 📝 API Integration

The app connects to Flask backend at `http://127.0.0.1:5000`:

- `GET /news?domain={domain}` - Fetch news
- `POST /chat` - Send chat queries
- Request body: `{ domain, year, query }`

## 🛠️ Project Structure

```
src/
├── main.jsx              # Entry point
├── App.jsx              # Main app component
├── App.css              # App styles
├── components/          # React components
│   ├── Header.jsx       # Navigation & search
│   ├── HeroSection.jsx  # Stats bar
│   ├── DashboardSection.jsx  # Analytics
│   ├── MainLayout.jsx   # Main content area
│   ├── NewsPanel.jsx    # News feed
│   ├── ChatPanel.jsx    # Chat interface
│   ├── NewsCard.jsx     # Individual news item
│   ├── ChatMessage.jsx  # Chat bubble
│   ├── SentimentBadge.jsx  # Sentiment indicator
│   ├── PromptChips.jsx  # Example prompts
│   └── *.css            # Component styles
└── styles/
    └── global.css       # Global styles & animations

package.json             # Dependencies
vite.config.js          # Vite configuration
index.html              # HTML template
```

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

- Desktop: Full side-by-side layout
- Tablet (< 1200px): Stacked layout
- Mobile (< 768px): Optimized single column

## ⚙️ Configuration

### Port Change
Update `vite.config.js`:
```javascript
server: {
  port: 3001,  // Change to desired port
  ...
}
```

### Backend URL Change
Update `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://your-backend:port',
    ...
  }
}
```

## 🐛 Troubleshooting

**Issue: Backend connection fails**
- Ensure Flask app is running on `http://127.0.0.1:5000`
- Check CORS settings in Flask app
- Verify proxy settings in `vite.config.js`

**Issue: Styles not loading**
- Clear browser cache
- Delete `node_modules` and reinstall: `npm install`
- Restart dev server: `npm run dev`

**Issue: Port already in use**
- Change port in `vite.config.js`
- Or kill process using port 3000: `lsof -ti:3000 | xargs kill -9`

## 📄 License

All rights reserved - Policy Pulse AI

## 🤝 Support

For issues or questions, please contact the development team.
