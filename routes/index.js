var express = require("express");
var router = new express.Router();
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection mongodb URL write and read rights
//const url = process.env.MLAB;

// Connection mongodb URL read only
const url = "mongodb://visitor:visitor@ds261838.mlab.com:61838/instafight";


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

/* POST add a fight records. */
router.post("/addfight", function (req, res) {
  console.log(req.body);
  addfight(req.body, (mensaje) => res.send(mensaje));
});


/* Conexion to the data base collection fights_records. */
function encontrarSucursales (db, callback) {
  const collection = db.collection("fights_records");
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
}
/* Conexion to the data base instafight. */
function getSucursales (callback) {
  MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log("Connected");
    const db = client.db("instafight");
    encontrarSucursales(db, callback);
    client.close();
  });
}

/* GET fights records. */
router.get("/fightsrecords", (req, res) => {
  getSucursales((sucursales) => res.send(sucursales));
});


module.exports = router;
