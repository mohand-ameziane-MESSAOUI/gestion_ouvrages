const mongoose = require("mongoose");


var response = require("../configurations/responsesTempalte");
var ouvrage = require("../models/ouvrage");

exports.create_ouvrage = (req, res, next) => {

    let filePath = process.env.DEFAULT_PORFIL_IMAGE;
    console.log(filePath);
    try {
        filePath = req.file.path
    } catch (e) {
    }
    console.log(filePath);
    var ouvr = new ouvrage({
        _id: mongoose.Types.ObjectId(),
        titre: req.body.titre,
        auteur: req.body.auteur,
        ISBN: req.body.ISBN,
        photo: filePath,
        maisonEdition: req.body.maisonEdition,
        emplacementPhysique: req.body.emplacementPhysique,
        genre: req.body.genre,
        statut: req.body.statut,
    });
    ouvr
        .save()
        .then(data => {
            let ouvrageRes = {
                "photo": data.photo,
                "_id": data._id,
                "titre": data.titre,
                "auteur": data.auteur,
                "ISBN": data.ISBN,
                "maisonEdition": data.maisonEdition,
                "emplacementPhysique": data.emplacementPhysique,
                "genre": data.genre,
                "statut": data.statut,
            }
            response(res, 201, true, "the ouvrage has been created", ouvrageRes)
        })
        .catch(err => {
            response(res, 500, false, "error", err)
        })
}


exports.delete_ouvrage = (req, res, next) => {

    ouvrage.deleteOne({
        _id: req.params.id
    })
        .then(result => {
            response(res, 200, true, "Done ! has been deleted")
        })
        .catch(err => {
            response(res, 400, false, "ouvrage not found ", err)
        })

}


exports.get_all_ouvrage = async (req, res, next) => {

    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 10;

    if (req.query) {
        var query = {}
        if (req.query.titre) {
            query.titre = {
                $regex: req.query.titre
            }
        }
        if (req.query.auteur) {
            query.auteur = {
                $regex: req.query.auteur
            }
        }
        if (req.query.genre) {
            query.genre = {
                $regex: req.query.genre
            }
        }
        if (req.query.statut) {
            query.statut = {
                $regex: req.query.statut
            }
        }
    }
    const countpreter = await ouvrage.countDocuments({statut: 'Prêté'});
    const countdisponible = await ouvrage.countDocuments({statut: 'disponible'});
    const countouvrages = await ouvrage.countDocuments({});

    await ouvrage.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec((err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            ouvrage.countDocuments(query).exec((count_error, count) => {
                if (count_error) {
                    return res.status(404).json(count_error);
                }
                        return res.status(200).json({
                            success: true,
                            message: "successful operation",
                            page: page,
                            page_size: result.length,
                            total: count,
                            total_ouvrages: countouvrages,
                            total_preter: countpreter,
                            total_disponible: countdisponible,
                            data: result
                        });
                    });
                });
}


exports.get_ouvrage_by_id = async (req, res, next) => {

    let ouvr = await ouvrage
        .findOne({
            _id: req.params.id
        })
        .exec()
        .catch(err => response(res, 404, false, "can't find ouvrage"));
    (ouvr.length) ?
        response(res, 404, false, "can't find ouvrage") : response(res, 200, true, "successful operation", ouvr)
}

exports.edit_ouvrage = async (req, res, next) => {
    console.log("req.body",req.body)
    ouvrage.findOne({
        _id: req.params.id
    })
        .exec()
        .then(ouv => {
            ouv.photo = req.body.photo
            ouv.titre = req.body.titre
            ouv.auteur = req.body.auteur
            ouv.ISBN = req.body.ISBN
            ouv.maisonEdition = req.body.maisonEdition
            ouv.emplacementPhysique = req.body.emplacementPhysique
            ouv.genre = req.body.genre
            ouv.statut = req.body.statut

            ouv
                .save()
                .then(data => {
                    response(res, 200, true, "successful operation", data)
                })
                .catch(err => {
                    response(res, 500, false, "error", err)
                })
        })
        .catch(e => {
            console.log(e);
            response(res, 500, false, "error", err)
        });

}
