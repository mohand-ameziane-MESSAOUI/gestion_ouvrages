const mongoose = require("mongoose");

const ouvrageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    ISBN: { type: String, required: true },
    photo: { type: String, required: false, default: "/uploads/default/defaultImage.png" },
    maisonE: { type: String, required: true },
    emplacementP: { type: String, required: true },
    genre: { type: String, required: true },
    statut: { type: String, required: true }

});

module.exports = mongoose.model('ouvrage', ouvrageSchema);
