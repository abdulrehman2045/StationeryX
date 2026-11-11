import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  siteName: { type: String, default: 'StationeryX' },
  tagline: { type: String, default: 'Tools for every idea' },
  whatsapp: { type: String, default: '923001234567' },
  email: { type: String, default: 'hello@stationeryx.com' },
  phone: { type: String, default: '+92 300 1234567' },
  address: { type: String, default: 'Karachi, Pakistan' }
});

export default mongoose.model('Setting', schema);
