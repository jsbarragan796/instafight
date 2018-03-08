var express = require("express");
var router = new express.Router();

//var url = "https://www.instagram.com/jusebarjer/?__a=1";

/* Inicio conexion base de datos filas_agiles. */
//function getplayer (callback, play1) {
//}


/* GET home page. */
router.get("/instafight", (req, res) => {
  //req.query.play1;
  //req.query.play2;
// res.send(usuario);
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


module.exports = router;
