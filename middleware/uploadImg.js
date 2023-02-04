const multer = require('multer')
const path = require('path')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..' ,'public/images'));
  },
  filename: (req, file, cb) => {
      cb(null, new Date().getTime()+ '-' + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
      cb(null, true);
  }else{
      cb(null, false);
  }
}

const dest = multer({storage: fileStorage, fileFilter: fileFilter});

exports.uploader = (req, res, next) => {
  dest.single('image')(req, res, next)
}