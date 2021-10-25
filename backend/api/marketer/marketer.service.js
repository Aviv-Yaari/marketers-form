const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy);
    const sortBy = filterBy.sortBy ? JSON.parse(filterBy.sortBy) : {};
    const collection = await dbService.getCollection('marketer');
    const marketers = await collection.find(criteria).sort(sortBy).toArray();
    return marketers;
  } catch (err) {
    console.error('cannot find marketers', err);
    throw err;
  }
}

async function remove(marketerId) {
  try {
    const collection = await dbService.getCollection('marketer');
    const criteria = { _id: ObjectId(marketerId) };
    await collection.deleteOne(criteria);
  } catch (err) {
    console.error(`cannot remove marketer ${marketerId}`, err);
    throw err;
  }
}

async function add(marketer) {
  try {
    const collection = await dbService.getCollection('marketer');
    await collection.insertOne(marketer);
    return marketer;
  } catch (err) {
    console.error('cannot insert marketer', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const criteria = {};
  if (filterBy.text) {
    const textCriteria = { $regex: filterBy.text, $options: 'i' };
    criteria.$or = [
      {
        email: textCriteria,
      },
      {
        message: textCriteria,
      },
    ];
  }
  return criteria;
}

module.exports = {
  query,
  remove,
  add,
};
