const multer = require('multer');
const path=require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    // filename: (file, cb) => {
    //     cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    //     return filename
    // }
    filename: function (req, file, cb) {
        // let ext = path.extname(file.originalname)
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg')
    {
        cb(null, true);
    } else {
        console.log('only image File allowed');
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter,limits:{fileSize:1024*1024*8}});

module.exports = upload 