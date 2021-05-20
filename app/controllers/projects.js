const projectsModel = require('../models/projects.js')
const {
  verify
} = require('../library/jwt.js')
const path = require("path")
const scriptName = path.dirname(path.dirname(path.dirname(__filename)))

module.exports = {
  GET: async (req, res) => {
    try {
      const pjs = await projectsModel.getProjects(req)

      res.send(pjs)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },

  POST: async (req, res) => {
    try {
      const def_obj = {
        mimetype: ""
      }
      const project_img = req.files.project_img || def_obj;
      const project_old_img = req.files.project_old_img || def_obj;
      const project_new_img = req.files.project_new_img || def_obj;

      if (!req.files || Object.keys(req.files).length < 3 || !project_img.mimetype.match(/image/g) || !project_old_img.mimetype.match(/image/g) || !project_new_img.mimetype.match(/image/g)) {
        return res.status(400).send({
          message: 'File ERROR'
        });
      }

      const project_img_uuid = require("uuid").v4();
      const project_old_img_uuid = require("uuid").v4();
      const project_new_img_uuid = require("uuid").v4();
      const uploadPath = scriptName + '/data/img/';

      if (project_img.mimetype.match(/image/g)) {
        project_img.mv(uploadPath + project_img_uuid, async function (err) {
          if (err) {
            return res.status(500).send(err);
          } else {
            if (project_old_img.mimetype.match(/image/g)) {
              project_old_img.mv(uploadPath + project_old_img_uuid,
                async function (erro) {
                  if (erro) {
                    return res.status(500).send(err);
                  } else {
                    if (project_new_img.mimetype.match(/image/g)) {
                      project_new_img.mv(uploadPath + project_new_img_uuid,
                        async function (error) {
                          if (error) {
                            return res.status(500).send(err);
                          } else {
                            const project = await projectsModel.insertProject(req, project_img_uuid, project_old_img_uuid, project_new_img_uuid)
                            return res.send(project)
                          }
                        })
                    }
                  }
                })
            }
          }
        });
      }
    } catch (error) {
      res.send(error)
    }
  },

  DELETE: async (req, res) => {
    try {
      const blog = await projectsModel.deleteProject(req)

      res.send(blog)
    } catch (error) {
      res.send(error)
    }
  }
}