import mongoose from 'mongoose';
import { conf } from '../config/config.js';

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate tokens are added
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400, // Token will automatically be removed after 24 hours (86400 seconds)
    },
  });
  
  // Create the model
  const BlacklistedTokenModel = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
  export default BlacklistedTokenModel;