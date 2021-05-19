const partnersModel = require('../models/partners.js')
const {
  verify
} = require('../library/jwt.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const parners = await partnersModel.getPartners(req)

      res.send(parners)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {

      let partner_img;
      let uploadPath;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "partner_img") is used to retrieve the uploaded file
      let path = require("path")
      let scriptName = path.dirname(path.dirname(path.dirname(__filename)))
      partner_img = req.files.partner_img || {};
      let uuid = require("uuid").v4()
      uploadPath = scriptName + '/data/img/' + uuid;

      if (partner_img.mimetype.match(/image/g)) {
        partner_img.mv(uploadPath, async function (err) {
          if (err) {
            return res.status(500).send(err);
          }
          const partners = await partnersModel.insertPartners(req, uuid)

          return res.send(partners)
        });
      }


    } catch (error) {
      res.send(error)
    }
  },

  PUT: async (req, res) => {
    try {

      let partner_img;
      let uploadPath;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      // The name of the input field (i.e. "partner_img") is used to retrieve the uploaded file
      let path = require("path")
      let scriptName = path.dirname(path.dirname(path.dirname(__filename)))
      partner_img = req.files.partner_img || {};
      let uuid = require("uuid").v4()
      uploadPath = scriptName + '/data/img/' + uuid;

      if (partner_img.mimetype.match(/image/g)) {
        partner_img.mv(uploadPath, async function (err) {
          if (err) {
            return res.status(500).send(err);
          }
          const returning = await partnersModel.setPartner(req, uuid)

          return res.send(returning)
        });
      }
    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const blog = await partnersModel.deletePartner(req)

      res.send(blog)
    } catch (error) {
      res.send(error)
    }
  },
}