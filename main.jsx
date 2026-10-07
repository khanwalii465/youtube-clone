import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const videos = [
  {
    id: 1,
    title: 'React in 20 Minutes — Build Your First App',
    channel: 'Code Simple',
    views: '1.2M views',
    time: '3 days ago',
    duration: '20:14',
    color: '#ff5f6d',
    category: 'Coding',
  },
  {
    id: 2,
    title: 'A Calm Morning Routine That Actually Works',
    channel: 'Everyday Better',
    views: '842K views',
    time: '1 week ago',
    duration: '12:08',
    color: '#36d1dc',
    category: 'Lifestyle',
  },
  {
    id: 3,
    title: '10 Places You Need to Visit in India',
    channel: 'Travel Notes',
    views: '3.8M views',
    time: '2 weeks ago',
    duration: '18:42',
    color: '#f6d365',
    category: 'Travel',
  },
  {
    id: 4,
    title: 'JavaScript Concepts You Should Know',
    channel: 'Dev Desk',
    views: '625K views',
    time: '5 days ago',
    duration: '24:31',
    color: '#667eea',
    category: 'Coding',
  },
  {
    id: 5,
    title: 'Easy Dinner Ideas for Busy Weeknights',
    channel: 'Kitchen Lab',
    views: '2.1M views',
    time: '4 days ago',
    duration: '10:25',
    color: '#43e97b',
    category: 'Cooking',
  },
  {
    id: 6,
    title: 'Lo-fi Beats to Help You Focus',
    channel: 'Focus Radio',
    views: '8.4M views',
    time: '3 months ago',
    duration: '1:02:17',
    color: '#764ba2',
    category: 'Music',
  },
  {
    id: 7,
    title: 'How Computers Work: A Beginner Guide',
    channel: 'Learn Fast',
    views: '954K views',
    time: '2 days ago',
    duration: '16:50',
    color: '#4facfe',
    category: 'Education',
  },
  {
    id: 8,
    title: 'The Best Gadgets I Used This Year',
    channel: 'Tech Daily',
    views: '1.7M views',
    time: '6 days ago',
    duration: '14:06',
    color: '#fa709a',
    category: 'Tech',
  },
];

const categories = ['All', 'Coding', 'Music', 'Travel', 'Cooking', 'Tech', 'Education', 'Lifestyle'];

function App() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchText, setSearchText] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand-area">
          <button className="icon-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            ☰
          </button>
          <div className="logo">
            <span className="logo-mark">▶</span>
            <span>YouTube</span>
          </div>
        </div>

        <div className="search-area">
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search"
          />
          <button className="search-button" aria-label="Search">
            🔍
          </button>
        </div>

        <div className="actions">
          <button className="icon-button" aria-label="Notifications">🔔</button>
          <button className="icon-button" aria-label="Account">◯</button>
        </div>
      </header>

      <div className="layout">
        {sidebarOpen && (
          <aside className="sidebar">
            <NavItem icon="⌂" label="Home" active />
            <NavItem icon="◉" label="Explore" />
            <NavItem icon="▶" label="Subscriptions" />
            <div className="divider" />
            <NavItem icon="↶" label="History" />
            <NavItem icon="👍" label="Liked videos" />
          </aside>
        )}

        <main className="content">
          <div className="chips">
            {categories.map((category) => (
              <button
                key={category}
                className={`chip ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <section className="video-grid">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </section>

          {filteredVideos.length === 0 && (
            <div className="empty-state">No videos found.</div>
          )}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <button className={`nav-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

function VideoCard({ video }) {
  return (
    <article className="video-card" onClick={() => alert(`Playing: ${video.title}`)}>
      <div className="thumbnail" style={{ '--thumb-color': video.color }}>
        <div className="thumbnail-pattern" />
        <span className="duration">{video.duration}</span>
        <span className="play-badge">▶</span>
      </div>
      <div className="video-info">
        <div className="avatar">{video.channel.charAt(0)}</div>
        <div>
          <h2>{video.title}</h2>
          <p>{video.channel}</p>
          <p>{video.views} • {video.time}</p>
        </div>
      </div>
    </article>
  );
}

createRoot(document.getElementById('root')).render(<App />);
