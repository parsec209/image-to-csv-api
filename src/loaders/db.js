const mongoose = require('mongoose')


module.exports = async () => {

  const databaseUri = process.env.MONGODB_URI
  await mongoose.connect(databaseUri)
  return mongoose.connection
}
