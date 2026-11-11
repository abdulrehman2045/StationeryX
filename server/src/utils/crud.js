export default (Model, populate) => ({
  list: async (req, res) => {
    const query = Model.find().sort('-createdAt');
    if (populate) query.populate(populate);
    res.json(await query);
  },
  create: async (req, res) => res.status(201).json(await Model.create(req.body)),
  update: async (req, res) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    doc.set(req.body);
    res.json(await doc.save());
  },
  remove: async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  }
});
