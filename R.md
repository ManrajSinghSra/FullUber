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

then make juust routers  for caption
express validator validation for regiter of caption 


service for cration of caption model