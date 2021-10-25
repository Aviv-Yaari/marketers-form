const marketerService = require('./marketer.service');

async function getMarketers(req, res) {
  try {
    const marketers = await marketerService.query(req.query);
    res.send(marketers);
  } catch (err) {
    res.status(500).send({ err: 'Failed to get marketers' });
  }
}

async function deleteMarketer(req, res) {
  try {
    await marketerService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).send({ err: 'Failed to delete marketer' });
  }
}

async function addMarketer(req, res) {
  try {
    let marketer = req.body;
    marketer = await marketerService.add(marketer);
    res.send(marketer);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) res.status(400).send({ err: 'Email already exists' });
    else res.status(500).send({ err: 'Failed to add marketer' });
  }
}

module.exports = {
  getMarketers,
  deleteMarketer,
  addMarketer,
};
