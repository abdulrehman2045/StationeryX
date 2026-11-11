export default (err, req, res, next) => {
  if (err.code === 11000) return res.status(400).json({ message: 'This value already exists' });
  if (err.name === 'ValidationError') return res.status(400).json({ message: Object.values(err.errors)[0].message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid value provided' });
  res.status(500).json({ message: err.message || 'Server error' });
};
