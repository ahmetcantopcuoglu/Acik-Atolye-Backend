const express = require("express");
const dotenv = require("dotenv").config();
const app =express();
const router = require("./router/router")


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

// app.get("/",(req,res)=>{
//     res.send("Merhaba bu benim ilk http  server çalışmam");

// });

// app.get("/about",(req,res)=>{
//     res.send("About sayfası");
// });

// app.get("/home",(req,res)=>{
//     res.send("<h1>Home Sayfası</h1>");
// });


app.listen(PORT,()=>{
    console.log(`Uygulama ${PORT} portunda çalışıyor...`);
});