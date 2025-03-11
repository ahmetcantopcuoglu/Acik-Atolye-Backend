const User = require("../model/user.model");
const utils = require("../utils/helper")

const { StatusCodes } = require("http-status-codes");
const baseResponse = require("../dto/baseResponse.dto");
exports.register = async (req, res) => {

    try {
        const { name, surname, email, password } = req.body;
        const existUser = await User.find({ email: email });
        if (existUser.length>0) {
            throw new Error("Bu email önceden kullanılmış");
        }

        const _password = utils.hashToPassword(password);
        const user = new User({
            name,
            surname,
            email,
            password: _password,
        });

        await user.save();

        res
            .json({
                ...baseResponse,
                error: false,
                succes: true,
                message: "Kullanıcı kaydı başarılı",
                data: user,
            });

    }
    catch (error) {

        res.json({ ...baseResponse,
            error:true,
            success:false, 
            timestamp:new Date(), 
            code:StatusCodes.INTERNAL_SERVER_ERROR,
            message:error.message,
         })
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}