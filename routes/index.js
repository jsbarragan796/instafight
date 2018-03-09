var express = require("express");
var router = new express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection mongodb URL write and read rights
const url = process.env.MLAB;

// Connection mongodb URL only read
//const url_visitor = "mongodb://visitor:visitor@ds261838.mlab.com:61838/instafight";


function savefight (pedido, db, callback) {
  const collection = db.collection("fights_records");
  collection.insert(pedido).then(() =>
    callback("insertado con exito")
  );
}

function addfight (pedido, callback) {
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("instafight");
    savefight(pedido, db, callback);
    client.close();
  });
}

/* POST add a fight recor. */
router.post("/addfight", function (req, res) {
  console.log(req.body);
  addfight(req.body, (mensaje) => res.send(mensaje));
});


/*encuentra un usuario segun las credenciales*/
function findUsuario (query, db, callback) {
  const collection = db.collection("clientes_restaurantes");
  collection.findOne(query, { fields: { _id: 0, pass: 0 } }, (err, docs) => {
    assert.equal(err, null); //se revisan que no se den errores.
    console.log("Found " + JSON.stringify(docs) + " urls");
    if (docs === null || docs === undefined) docs = { error: "credenciales incorrectas" }; //sino se encuentra el usuario, se responde con un error
    callback(docs); //se responde con el usuario
  });
}

/* Permite encontrar a un usuario en la base de datos*/
function getUsuario (query, callback) {
  MongoClient.connect(url, (err, client) => { // conexion a la base de datos
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("filas_agiles"); //se pide la collecion de los usuarios
    findUsuario(query, db, callback); //se busca al usuario en la base de datos
    client.close(); //se cierra collecion
  });
}

/* GET home page. */
router.get("/usuario", (req, res) => {
  getUsuario(
    {
      correo: req.query.correo, //crea el query segun los datos que llegan en el req
      pass: req.query.pass
    },
    (usuario) => res.send(usuario)
  );
});

/* GET home page. */
router.get("/fights_records", (req, res) => {
  //req.query.play1;
  //req.query.play2;
// res.send(usuario);
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


module.exports = router;
