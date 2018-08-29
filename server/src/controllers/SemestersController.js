const {Semester} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const semesters = await Semester.findAll({
        limit: 10
      })
      res.send(semesters)
    } catch (err) {
      res.status(500).send({
        error: 'Ocurrio un problema tratando de obtener los semestres'
      })
    }
  },
  async put (req, res) {
    try {
      const semester = await Semester.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      res.send(semester)
    } catch (err) {
      res.status(500).send({
        error: 'Ocurrio un problema intentando actualizar el semestre'
      })
    }
  },
  async post (req, res) {
    try {
      const semester = await Semester.create(req.body)
      res.send(semester)
    } catch (err) {
      res.status(500).send({
        error: 'Ocurrio un problema al intentar crear el semestre'
      })
    }
  },
  async delete (req, res) {
    console.log(req.body)
    try {
      const semester = await Semester.findOne({
        where: {
          id: req.params.id
        }
      })
      semester.destroy()
      res.send(semester)
    } catch (err) {
      res.status(500).send({
        error: 'Ocurrio un error intentando eliminar el semestre'
      })
    }
  }
}
