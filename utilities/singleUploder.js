const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

function uploader(subfolder_path, allowed_file_types, max_file_size, error_msg) {
    //file upload folder
    const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}/`;

    //define storage
    const storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, UPLOADS_FOLDER)
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const filename = 
            file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-")+"-"+Date.now();

            cb(null, filename+fileExt);
        },
    });

    //prepare the final mulder upload object
    const upload = multer({
        storage: storage,
        limits:{
            fieldSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {
            if(allowed_file_types.includes(file.mimetype)){
                cb(null, true);
            }else{
                cb(createError(error_msg));
            }
        }
    })
    return upload;
}

module.exports = uploader;