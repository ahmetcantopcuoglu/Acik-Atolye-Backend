const { error } = require("console")
const mongoose = require("mongoose")

const mongooseConnection = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://root:root@cluster0.zbm0c.mongodb.net/",
            {
                connectTimeoutMS: 5000,
                dbName: "express_db",
            }
        );
        console.log("Veritabanı bağlantısı başırılı");
    }
    catch (error) {
        throw new Error(error)
    }

};

module.exports = {
    mongooseConnection,
};