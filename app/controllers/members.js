const memberModel = require('../models/members.js')
const {
  verify
} = require('../library/jwt.js')

module.exports = {
  GET: async ({
    cookies: {
      token
    },
    query: {
      page,
      limit
    }
  }, res) => {
    try {
      const members = await memberModel.getMembers(page, limit)


      res.send(members)
    } catch (error) {
      res.status(401).send(error)
    }
  },

  POST: async (req, res) => {
    try {
    let member_img;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "member_img") is used to retrieve the uploaded file
    let path = require("path")
    let scriptName = path.dirname(path.dirname(path.dirname(__filename)))
    member_img = req.files.member_img || {};
    let uuid = require("uuid").v4()
    uploadPath = scriptName + '/data/img/' + uuid;
    
    if (member_img.mimetype.match(/image/g)) {
      member_img.mv(uploadPath, async function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        const member = await memberModel.addMember(req, uuid);

        return res.send(member);
      });
    }

    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const deletedMember = await memberModel.deleteMember(req)

      res.send(deletedMember)
    } catch (error) {
      res.send(error)
    }
  }
}