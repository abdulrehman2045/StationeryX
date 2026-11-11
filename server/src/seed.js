import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Setting from './models/Setting.js';

await mongoose.connect(process.env.MONGO_URI);

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!(await User.findOne({ email: ADMIN_EMAIL }))) {
  await User.create({ name: ADMIN_NAME, email: ADMIN_EMAIL, password: ADMIN_PASSWORD, role: 'admin' });
}

if (!(await Setting.findOne())) {
  await Setting.create({});
}

console.log('Seed completed');
await mongoose.disconnect();
