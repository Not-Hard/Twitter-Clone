# 🎬 Netflix Clone

A full-stack Netflix clone built with React.js and Node.js, featuring user authentication, movie/TV show browsing, and video streaming capabilities.

![Netflix Clone](https://img.shields.io/badge/Netflix-Clone-red?style=for-the-badge&logo=netflix)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## 🌟 Features

### 🔐 Authentication System
- **User Registration & Login** with JWT tokens
- **Protected Routes** with middleware
- **Session Management** with HTTP-only cookies
- **Persistent Authentication** across browser sessions

### 🎥 Content Browsing
- **Trending Movies & TV Shows** on homepage
- **Category Browsing** (Popular, Top Rated, Upcoming, etc.)
- **Movie Sliders** with smooth horizontal scrolling
- **Detailed Movie/TV Show Pages** with trailers
- **Similar Content Recommendations**

### 🔍 Search & Discovery
- **Search Functionality** across movies and TV shows
- **Search History** tracking
- **Real-time Search Results**

### 📱 UI/UX
- **Netflix-style Design** with dark theme
- **Responsive Layout** for all devices
- **Smooth Animations** and transitions
- **Loading Skeletons** for better UX
- **Hidden Scrollbars** for clean appearance

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Player** - Video player component
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cookie Parser** - Cookie handling

### External APIs
- **TMDB API** - Movie and TV show data

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- TMDB API key

### 1. Clone the repository
```bash
git clone https://github.com/Not-Hard/NETFLIX-Clone.git
cd NETFLIX-Clone
```

### 2. Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
TMDB_API_KEY=your_tmdb_api_key
PORT=5000
```

### 4. Run the application

#### Development Mode
```bash
# Start backend (from root directory)
npm run dev

# Start frontend (in another terminal)
cd frontend
npm run dev
```

#### Production Mode
```bash
# Build and start
npm run build
npm start
```

## 🌐 Access URLs
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📁 Project Structure
```
NETFLIX-Clone/
├── frontend/                    # React.js frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── MovieSlider.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── skeleton/
│   │   ├── pages/              # Route components
│   │   │   ├── home/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── WatchPage.jsx
│   │   │   └── SearchPage.jsx
│   │   ├── store/              # Zustand state management
│   │   │   ├── authUser.js
│   │   │   └── content.js
│   │   ├── hooks/              # Custom React hooks
│   │   └── utils/              # Helper functions
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Node.js backend
│   ├── controllers/            # Route handlers
│   │   ├── auth_controller.js
│   │   ├── movie_controller.js
│   │   ├── tvshow_controller.js
│   │   └── search_controller.js
│   ├── models/                 # MongoDB schemas
│   │   └── user_model.js
│   ├── routes/                 # API endpoints
│   │   ├── auth_route.js
│   │   ├── movie_route.js
│   │   ├── tvshow_route.js
│   │   └── search_route.js
│   ├── middleware/             # Custom middleware
│   │   └── protectRoute.js
│   ├── services/               # External API services
│   │   └── tmbd_services.js
│   ├── config/                 # Configuration files
│   │   ├── db.js
│   │   └── envVars.js
│   └── server.js               # Entry point
├── .env                        # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🚀 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/authCheck` - Check authentication status

### Movies
- `GET /api/v1/movie/trending` - Get trending movies
- `GET /api/v1/movie/:category` - Get movies by category
- `GET /api/v1/movie/:id/trailers` - Get movie trailers
- `GET /api/v1/movie/:id/details` - Get movie details
- `GET /api/v1/movie/:id/similar` - Get similar movies

### TV Shows
- `GET /api/v1/tvshow/trending` - Get trending TV shows
- `GET /api/v1/tvshow/:category` - Get TV shows by category
- `GET /api/v1/tvshow/:id/trailers` - Get TV show trailers
- `GET /api/v1/tvshow/:id/details` - Get TV show details
- `GET /api/v1/tvshow/:id/similar` - Get similar TV shows

### Search
- `GET /api/v1/search/person/:query` - Search for people
- `GET /api/v1/search/movie/:query` - Search for movies
- `GET /api/v1/search/tv/:query` - Search for TV shows
- `GET /api/v1/search/history` - Get search history
- `DELETE /api/v1/search/history/:id` - Delete search item

## 🎨 Features in Detail

### Authentication Flow
1. Users can sign up with email and password
2. Passwords are hashed using bcryptjs
3. JWT tokens are stored in HTTP-only cookies
4. Protected routes require valid authentication

### Content Management
1. Data is fetched from TMDB API
2. Content is categorized (trending, popular, top-rated, etc.)
3. Users can browse movies and TV shows separately
4. Search functionality with history tracking

### Video Streaming
1. Trailers are embedded using React Player
2. Multiple trailer support with navigation
3. Full-screen video playback

## 🔒 Security Features
- JWT authentication with HTTP-only cookies
- Password hashing with bcryptjs
- Protected API routes
- CORS configuration
- Input validation and sanitization

## 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Smooth scrolling sliders
- Touch-friendly interactions

## 🚧 Roadmap
- [ ] User profiles and preferences
- [ ] Watchlist functionality
- [ ] Rating and review system
- [ ] Real-time notifications
- [ ] Advanced search filters
- [ ] Video quality selection

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License
This project is for educational purposes only. Netflix is a trademark of Netflix, Inc.

## 👨‍💻 Author
**Not-Hard**
- GitHub: [@Not-Hard](https://github.com/Not-Hard)

## 🙏 Acknowledgments
- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Netflix](https://netflix.com) for design inspiration
- All contributors and open-source libraries used

---

**Note**: This is a clone project created for learning purposes. It is not affiliated with Netflix, Inc.
