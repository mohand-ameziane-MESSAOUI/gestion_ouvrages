const multer = require("multer");

const config_storag = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile_image/')
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

module.exports = multer({
  storage: config_storag,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: filerFilter
})
