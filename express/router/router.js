const router = require ("express").Router();

const controller = require("../controller/controller")

router.post("/matematik/toplama",controller.toplama)
router.post("/matematik/cikartma",controller.cikartma)
router.post("/matematik/carpma",controller.carpma)
router.post("/matematik/bolme",controller.bolme)
module.exports =router;