const multer = require("multer");
const path = require('path')

const config_storasg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads/images'))
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
});
const filerFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" | file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const config_storag = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null,  file.originalname + "-" + Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({
  storage: config_storag,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filerFilter
})
