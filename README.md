# Twitter Clone

A full-stack social media application built with React.js and Node.js that replicates core Twitter functionality.

## 🚀 Features

- **User Authentication**: Secure signup, login, and logout with JWT tokens
- **Profile Management**: Edit profile information, bio, and profile pictures
- **Posts & Feed**: Create, view, and interact with posts
- **Real-time Notifications**: Get notified about likes, follows, and mentions
- **Image Upload**: Upload and manage images using Cloudinary
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Follow System**: Follow/unfollow other users
- **Protected Routes**: Secure API endpoints with middleware

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **DaisyUI** - UI components
- **TanStack Query** - Data fetching and state management
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage and management
- **Cookie Parser** - Cookie handling

## 📁 Project Structure

```
Twitter-Clone/
├── backend/
│   ├── controllers/
│   │   ├── authentication_controller.js
│   │   ├── user_controller.js
│   │   ├── post_controller.js
│   │   └── notification_controller.js
│   ├── middleware/
│   │   └── protectRoute.js
│   ├── models/
│   │   ├── user_module.js
│   │   ├── post_model.js
│   │   └── notification_model.js
│   ├── routes/
│   │   ├── authentication_route.js
│   │   ├── user_route.js
│   │   ├── post_route.js
│   │   └── notification_route.js
│   ├── db/
│   │   └── connectMongoDB.js
│   ├── lib/
│   │   └── utils/
│   │       └── generate_Token.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── skeletons/
    │   │   └── svgs/
    │   ├── pages/
    │   │   ├── authentication/
    │   │   ├── home/
    │   │   ├── notification/
    │   │   └── profile/
    │   ├── hooks/
    │   └── utils/
    ├── public/
    └── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/twitter-clone.git
   cd Twitter-Clone
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Run the Application**
   
   **Backend** (from backend directory):
   ```bash
   npm start
   # or for development with nodemon
   npm run dev
   ```
   
   **Frontend** (from frontend directory):
   ```bash
   npm run dev
   ```

   The application will be available at:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## 📚 API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /me` - Get current authenticated user

### Users (`/api/users`)
- `GET /profile/:username` - Get user profile
- `POST /follow/:id` - Follow/unfollow user
- `GET /suggested` - Get suggested users
- `POST /update` - Update user profile

### Posts (`/api/posts`)
- `GET /all` - Get all posts
- `GET /following` - Get posts from followed users
- `GET /likes/:id` - Get user's liked posts
- `GET /user/:username` - Get user's posts
- `POST /create` - Create new post
- `POST /like/:id` - Like/unlike post
- `POST /comment/:id` - Comment on post
- `DELETE /:id` - Delete post

### Notifications (`/api/notifications`)
- `GET /` - Get user notifications
- `DELETE /` - Delete all notifications

## 🔧 Configuration

### Database Models

**User Model**
```javascript
{
  username: String (unique),
  fullName: String,
  password: String (hashed),
  email: String (unique),
  followers: [ObjectId],
  following: [ObjectId],
  profileImg: String,
  coverImg: String,
  bio: String,
  link: String,
  likedPosts: [ObjectId]
}
```

**Post Model**
```javascript
{
  user: ObjectId,
  text: String,
  img: String,
  likes: [ObjectId],
  comments: [{
    text: String,
    user: ObjectId
  }]
}
```

**Notification Model**
```javascript
{
  from: ObjectId,
  to: ObjectId,
  type: String (follow, like),
  read: Boolean
}
```

## 🎨 Key Components

### Frontend Components
- **Sidebar**: Navigation menu with user profile
- **Posts**: Feed display with like/comment functionality
- **Profile Page**: User profile with edit capabilities
- **Notifications**: Real-time notification system
- **Authentication**: Login and signup forms
- **Loading Spinners**: Enhanced UX during data fetching

### Backend Features
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware for route protection
- **Image Upload**: Cloudinary integration for image handling
- **Password Security**: bcrypt hashing for passwords
- **Error Handling**: Comprehensive error management

## 🔒 Security Features

- JWT token authentication with HTTP-only cookies
- Password hashing with bcryptjs
- Protected API routes with middleware
- Input validation and sanitization
- CORS configuration
- Rate limiting on requests (5MB limit)
- Secure cookie settings for production

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Configure production MongoDB URI
3. Set secure cookie options
4. Deploy to platforms like:
   - Heroku
   - Railway
   - DigitalOcean
   - AWS EC2

### Frontend Deployment
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy to platforms like:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 Scripts

### Backend
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Frontend
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## 🐛 Known Issues

- Profile updates may require a page refresh in some cases
- Image uploads are limited to 5MB
- Real-time features require manual refresh

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons from React Icons library
- UI components inspired by Twitter's design
- Image handling powered by Cloudinary
- Authentication patterns from JWT best practices

---

**Note**: This is a learning project designed to demonstrate full-stack development skills. For production use, additional security measures, testing, and optimizations should be implemented.

## 📞 Contact

If you have any questions or suggestions, feel free to reach out!

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
