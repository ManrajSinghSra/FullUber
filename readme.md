# Transportation App

A ride-sharing application built with Node.js, Express, and MongoDB that connects users with drivers (captains).

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Installation & Setup

1. **Backend Setup**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   - Main entry point: `server.js` (changed from `app.js`)
   - Server runs on HTTP protocol
   - Uses `dotenv` for environment variables
   - CORS enabled for cross-origin requests

3. **Database Connection**
   - Uses Mongoose for MongoDB connection
   - Configure connection string in `.env` file

## 📊 Database Models

### User Model
```javascript
{
  fullName: String,
  email: String,
  password: String (hashed with bcrypt),
  socketId: String, // For real-time tracking
  select: false // Field selection control
}
```

### Captain Model (Driver)
```javascript
{
  fullName: String,
  email: String,
  password: String (hashed with bcrypt),
  socketId: String, // For real-time tracking
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  },
  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"]
    }
  },
  location: {
    latitude: Number,
    longitude: Number
  }
}
```

### Blacklisted Token Model
```javascript
{
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    expires: 86400, // 24 hours TTL
    default: Date.now
  }
}
```

## 🔐 Authentication & Security

### Password Handling
- **Bcrypt**: For password hashing
- **JWT**: For token generation and verification
- **Schema Methods**:
  - `generateToken()`: Creates JWT from user ID
  - `comparePassword()`: Compares plain text with hashed password
  - `hashPassword()`: Static method to hash passwords

### Token Management
- JWT tokens with 24-hour expiration
- Token blacklisting for logout functionality
- Automatic cleanup of expired blacklisted tokens

## 🛣️ API Routes

### User Routes (`/users`)

#### Registration - `POST /register`
- **Validation**: Uses `express-validator`
  ```javascript
  [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters"),
    body('fullName').isLength({min: 3}).withMessage("Full name must be at least 3 characters")
  ]
  ```
- **Controller**: Handles user registration
- **Service**: User creation service in `/services` folder

#### Login - `POST /login`
- Email and password authentication
- Returns JWT token
- Sets HTTP-only cookie

#### Profile - `GET /profile`
- **Protected Route**: Requires authentication middleware
- Returns user profile information
- Uses `select: false` for sensitive fields

#### Logout - `POST /logout`
- Blacklists current JWT token
- Clears authentication cookie
- Prevents token reuse

### Captain Routes (`/captains`)
- Similar structure to user routes
- Additional fields for vehicle and location management
- Status management (active/inactive)

## 🔒 Middleware

### Authentication Middleware
- Verifies JWT tokens
- Checks token blacklist
- Attaches user/captain to request object
- Handles token expiration

### Validation Middleware
- Uses `express-validator` for input validation
- Handles validation errors with `validationResult()`
- Returns structured error responses

## 📁 Project Structure

```
├── server.js              # Main server file
├── app.js                 # Express app configuration
├── models/
│   ├── user.model.js      # User schema
│   ├── captain.model.js   # Captain schema
│   └── blacklistToken.model.js
├── controllers/
│   ├── user.controller.js
│   └── captain.controller.js
├── services/
│   ├── user.service.js
│   └── captain.service.js
├── routes/
│   ├── user.routes.js
│   └── captain.routes.js
├── middleware/
│   └── auth.middleware.js
└── .env                   # Environment variables
```

## 🔧 Environment Variables

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## ✨ Key Features

- **Real-time Tracking**: Socket.IO integration with socketId
- **Secure Authentication**: JWT with blacklisting
- **Input Validation**: Comprehensive validation using express-validator
- **Password Security**: Bcrypt hashing
- **Token Management**: 24-hour TTL with automatic cleanup
- **Flexible Queries**: Select field control for sensitive data
- **Vehicle Management**: Support for multiple vehicle types
- **Location Tracking**: Latitude/longitude for captains

## 🚦 Usage Flow

1. **User Registration**: Validate input → Hash password → Save to database
2. **User Login**: Validate credentials → Generate JWT → Set cookie
3. **Protected Routes**: Verify token → Check blacklist → Allow access
4. **User Logout**: Blacklist token → Clear cookie → Prevent reuse

## 📝 Notes

- All passwords are hashed using bcrypt before storage
- JWT tokens expire after 24 hours
- Blacklisted tokens are automatically cleaned up after expiration
- Captain status can be toggled between active/inactive
- Real-time features supported through socketId tracking