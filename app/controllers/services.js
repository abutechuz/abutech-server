const servicesModel = require('../models/services.js')
const {
  verify
} = require('../library/jwt.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const {
        page = 1, limit = 4, lang = 'uz'
      } = req.query

      const services = await servicesModel.getServices(page, limit, lang)

      res.send(services)

    } catch (error) {
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {
      let image;
      let uploadPath;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "image") is used to retrieve the uploaded file
      let path = require("path")
      let scriptName = path.dirname(path.dirname(path.dirname(__filename)))
      image = req.files.image || {};
      let uuid = require("uuid").v4()
      uploadPath = scriptName + '/data/img/' + uuid;

      if (image.mimetype.match(/image/g)) {
        image.mv(uploadPath, async function (err) {
          if (err) {
            return res.status(500).send(err);
          }
          const services = await servicesModel.addService(req , uuid)

          return  res.send(services);
        });
      }

    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const {
        service_id
      } = req.body

      const deletedService = await servicesModel.deleteService(service_id)

      res.send({
        deletedService
      })

    } catch (error) {
      res.send(error)
    }
  }
}