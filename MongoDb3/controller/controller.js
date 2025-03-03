const { error } = require("console");
const User = require("../model/user.model");
const md5= require("md5")

exports.createUser = async (req,res) => {
    try
    {
        const {name,surname,email,password}=req.body;
        const _password = md5(password);
        const user = new User ({

            name,
            surname,
            password:_password,
            email,

        });
        await user.save();
        res.status(201).json({
            error:false,
            success:true,
            message:"Kayıt başarılı",
            data:user,
        });

    }
    catch(error)
    {
        res
        .status(500)
        .json({error:true, success:false, message:error.message});
    }
};
exports.updateUser = async (req,res) => {
    try
    {

    }
    catch(error)
    {
        res
        .status(500)
        .json({error:true, success:false, message:error.message});
    }
};
exports.getUserById = async (req,res) => {
    try
    {

    }
    catch(error)
    {
        res
        .status(500)
        .json({error:true, success:false, message:error.message});
    }
};
exports.getAllUsers = async (req,res) => {
    try
    {

    }
    catch(error)
    {
        res
        .status(500)
        .json({error:true, success:false, message:error.message});
    }
};
exports.deleteUserById = async (req,res) => {
    try
    {

    }
    catch(error)
    {
        res
        .status(500)
        .json({error:true, success:false, message:error.message});
    }
};
exports.updatePassword = async (req,res) => {
    try
    {

    }
    catch(error)
    {
        res
        .status(500)
        .json({error:true, success:false, message:error.message});
    }
};
