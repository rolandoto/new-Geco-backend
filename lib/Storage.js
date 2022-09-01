const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Storage/Imgs')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.fieldname}-${Date.now()}.png`)
  }
})

const upload = multer({ storage})

module.exports = {upload}