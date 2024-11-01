const uploader = require("../../utilities/singleUploder");


function avatarUpload(req, res, next){
    const upload = uploader(
        "avatars",//folder name
        ["image/jpeg", "image/jpg", "image/png"],//image only
        1000000,//size
        "Only  .png, .jpg, .jpeg format allowed"
    );

    //call middleware function
    upload.any()(req, res,(err) => {
        if(err){
            res.status(500).json({
                errors:{
                    avatar:{
                        msg: err.message,
                    },
                },
            });
        }else{
            next();
        }
    });
}

module.exports = avatarUpload;