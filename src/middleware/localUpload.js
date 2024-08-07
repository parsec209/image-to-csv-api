const multer = require('multer')
const InputError = require('../util/inputError')


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 30 * 1024 * 1024},
}).array('myFiles', 40)


function localUpload (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return next(err)
    } else if (!req.files || !req.files.length) {
      return next(new InputError('No file chosen. Please select a file to upload', 400))
    } else {
      return next()
    }
  })
}


module.exports = localUpload
    
 
