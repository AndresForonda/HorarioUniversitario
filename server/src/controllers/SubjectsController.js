const {Subject} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const subjects = await Subject.findAll()
      res.send(subjects)
    } catch (err) {
      res.status(500).send({
        error: 'Ocurrio un error intentando obtener las materias.'
      })
    }
  },
  async post (req, res) {
    try {
      const subject = await Subject.create(req.body)
        .catch(Subject.ForeignKeyConstraintError = function () {
          res.status(500).send({
            error: 'Ocurrio un error intentando crear la materia'
          })
        })
        .catch(Subject.UniqueConstraintError = function () {
          res.status(500).send({
            error: 'Ocurrio un error intentando crear la materia'
          })
        })
      res.send(subject)
    } catch (err) {
      if (err.errors[0].validatorKey === 'not_unique') {
        res.status(500).send({
          error: 'not_unique'
        })
      } else {
        res.status(500).send({
          error: 'Ocurrio un error intentando crear la materia'
        })
      }
    }
  },
  async put (req, res) {
    console.log(req.body)
    try {
      const subject = await Subject.update(req.body, {
        where: {
          id: req.body.id
        }
      })
        .catch(Subject.ForeignKeyConstraintError = function () {
          res.status(500).send({
            error: 'Ocurrio un error intentando actualizar la materia'
          })
        })
        .catch(Subject.UniqueConstraintError = function () {
          res.status(500).send({
            error: 'Ocurrio un error intentando actualizar la materia'
          })
        })
      res.send(subject)
    } catch (err) {
      res.status(500).send({
        error: 'Ocurrio un error intentando modificar la materia'
      })
    }
  },
  async delete (req, res) {
    try {
      console.log(req.params)
      const subject = await Subject.findOne({
        where: {
          id: req.params.id
        }
      })
      await subject.destroy()
      res.send(subject)
    } catch (err) {
      res.status(500).send({
        error: 'Ocurrio un error intentando eliminar la materia'
      })
    }
  }
}
