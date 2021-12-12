var methods = require("../model/model")
var UserDb = methods.UserDb
var TypeDocuments = methods.typeDocument
var Areas = methods.areas
var SubAreas = methods.subareas

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty.' })
        return
    }

    const user = new UserDb({

        typeDocument: req.body.typeDocument,
        document: req.body.document,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,

    })

    user.save(user)
        .then((data) => {
            res.send({ ok: true, message: 'User created successfully' })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while creating user',
                ok: false
            })
        })

}

exports.find = (req, res) => {
    if (req.query.id || req.params.id) {
        const id = req.query.id || req.params.id
        UserDb.findById(id)
            .then(user => {
                if (!user) {
                    res.status(404).send({ message: 'User not found with id ' + id });
                } else {
                    res.send({ user, ok: true, message: 'User found' })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Error ocurred while retriving user with id ' + id
                })
            })
    } else {
        UserDb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Some error ocurred while retriving user info'
                })
            })
    }
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Data to update can not be empty.' })
        return
    }

    const id = req.params.id || req.query.id
    UserDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(400).send({ ok: false, message: 'Cannot update with user '.concat(id) })
            } else {
                res.send({ ok: true, message: 'User Updated', data })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while update user info'
            })
        })

}

exports.delete = (req, res) => {
    const id = req.params.id
    UserDb.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: 'Cannot Delete user with id'.concat(id) })
            }
            else {
                res.send({
                    message: 'User was deleted successfully!'
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while delete user'
            })
        })

}

exports.typeDocuments = (req, res) => {
    TypeDocuments.find()
        .then(arrayTypesDocuments => {
            res.send(arrayTypesDocuments)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error ocurred while retriving type documents info'
            })
        })
}


exports.searchByString = (req, res) => {
    var query = {}
    if (req.body.data) {
        query = {
            $or: [{ document: { $regex: req.body.data, $options: 'i' } },],
            $or: [{ name: { $regex: req.body.data, $options: 'i' } },],
            $or: [{ lastnName: { $regex: req.body.data, $options: 'i' } },],
            $or: [{ email: { $regex: req.body.data, $options: 'i' } },],
        }
    }
    UserDb.find(query, (err, docs) => {
        if (err) {
            res.send(err);
        }
        res.send(docs);
    })
}