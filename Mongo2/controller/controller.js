const { error } = require("console");
const User = require("../model/user.model");

exports.createUser = async (req, res) => {

    try {

        const { name, surname, email, gender, phone, title, age } = req.body;

        const user = new User({
            name,
            surname,
            email,
            gender,
            phone,
            title,
            age,
        });
        await user.save();

        res.json({
            error: false,
            success: true,
            data: user,
            message: "Kayıt başarılı",
        });

    }

    catch (error) {
        res.json({ error: true, success: false, errorMessage: error.message });
    }


}


//Tüm kullanıcıları getirme 

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find(); // tüm kullanıcıları getirir

        res.json({
            error: false,
            success: true,
            message: "Kullanıcılar başarıyla listelendi",
            data: users,
        });


    }

    catch (error) {
        res.json({
            error: true,
            success: false,
            message: error.message,
        });
    }
};


//İsme göre kullanıcı getir

exports.getUsersByName = async (req, res) => {

    try {
        const { name } = req.params;
        const users = await User.find({ name: name });
        res.json({
            error: false,
            success: true,
            message: "Kullanıcılar başarı ile listelendi",
            data: users,
        });
    }
    catch (error) {
        res.json({
            error: true,
            success: false,
            errorMessage: error.message
        });
    }

};

exports.getUsersByNameAndSurname = async (req, res) => {

    try {
        const { name,surname } = req.params;
        const users = await User.find({ name: name, surname:surname });
        res.json({
            error: false,
            success: true,
            message: "Kullanıcılar başarı ile listelendi",
            data: users,
        });
    }
    catch (error) {
        res.json({
            error: true,
            success: false,
            errorMessage: error.message
        });
    }

};