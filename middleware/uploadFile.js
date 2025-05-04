const multer = require('multer');
const path = require('path');

// Storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter (only images)
function fileFilter(req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed.'));
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: fileFilter
});

function uploadFile(req,res,next){
    upload.single('thumbnail')(req, res, async function (err) {
        if (err) {
            console.log(err)
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).render('addblog', { blog: null, error: 'Thumbnail size should not exceed 1MB.' });
            }
            return res.status(400).render('addblog', { bog: null, error: err.message });
        }else{
            next()
        }
    })
}


module.exports = uploadFile
