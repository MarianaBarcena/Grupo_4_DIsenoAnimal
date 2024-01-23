const { locals } = require("../app");
const { leerJSON, escribirJSON } = require("../data");
const transferLocals = require("../middlewares/transferLocals");
const productos = leerJSON('productos');
const inscribiteJSON = leerJSON('inscribite');


module.exports = {
    
    index: (req, res) => {

        return res.render('index', {
            productos
        })

    },
    cart: (req, res) => {
        /*return res.send(productos)       */
        return res.render('carrito', {
            productos
        })

    },
    inscribite: (req, res) => {
        const molde = require('../data/moldeInscribite');
        const { email } = req.body;
        const nuevoMolde = new molde(email);
        inscribiteJSON.push(nuevoMolde);
        escribirJSON(inscribiteJSON, 'inscribite');

        return res.redirect('/')
    }
}