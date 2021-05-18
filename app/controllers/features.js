const featuresModel = require('../models/features.js')
const { verify } = require('../library/jwt.js')

module.exports = {
  GET: async (req, res) => {
    try {
      const { page = 1, limit = 4, lang = 'uz' } = req.query

      const features = await featuresModel.getFeatures(page, limit, lang)

      res.send(features)

    } catch (error) {
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {
      const features = await featuresModel.addFeature(req)

      res.send(features)

    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const { feature_id } = req.body

      const deletedFeature = await featuresModel.deleteFeature(feature_id)

      res.send({ deletedFeature })

    } catch (error) {
      res.send(error)
    }
  }
}
