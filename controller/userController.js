const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

const User = require("../models/People");
const { cache } = require("ejs");


async function getUser(req,res,next){
    try{
        const users = await User.find();
        res.render("users", {
            users,
        });
    }catch(err){
        next(err);
    }
}


//add user
async function addUser(req,res,next){
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password,10)

    if(req.files && req.files.length > 0){
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    }else{
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        })
    }

    //save user or send err
    try{
        const result = await newUser.save();
        res.status(200).json({
            message: "user added successfully!",
        });
    }catch(err){
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknowen error occured!"
                }
            }
        })
    }
}


//delete
async function removeUser(req, res, next){
    try{
        const user = await User.findByIdAndDelete({
            _id: req.params.id,
        });

        //remove user avatar if any
        if(user.avatar){
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
                (err)=> {
                    if(err) console.log(err);
                }
            );
        }
        res.status(200).json({
            message: "User was removed successfully!",
        });
    }catch(err){
        res.status(500).json({
            errors: {
                common: {
                    msg: "Could not delete the user!",
                },
            },
        });
    }
}

module.exports = {
    getUser,
    addUser,
    removeUser
}