const techsModel = require('../models/techs.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const techs = await techsModel.getTechnologies()

      res.send(techs)

    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {
      let tech_image;
      let uploadPath;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "tech_image") is used to retrieve the uploaded file
      let path = require("path")
      let scriptName = path.dirname(path.dirname(path.dirname(__filename)))
      tech_image = req.files.tech_image || {};
      let uuid = require("uuid").v4()
      uploadPath = scriptName + '/data/img/' + uuid;

      if (tech_image.mimetype.match(/image/g)) {
        tech_image.mv(uploadPath, async function (err) {
          if (err) {
            return res.status(500).send(err);
          }
          const tech = await techsModel.addTechnology(req , uuid)

          return res.send(tech)
        });
      }


    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const tech = await techsModel.deleteTechnology(req)

      res.send(tech)

    } catch (error) {
      res.send(error)
    }
  }
}