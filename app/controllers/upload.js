const authJWT = require('../library/auth.js')

module.exports = {
  POST: function (req, res) {
    let sampleFile;
    let uploadPath;

    const { v4: uuidv4 } = require('uuid');

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    var path = require('path');
    var scriptName = path.dirname(path.dirname(path.dirname(__filename)));

    sampleFile = req.files.sampleFile;
    let Sources = [];
    if (sampleFile.length > 1 && sampleFile) {
      sampleFile.map(obj => {
        if (obj.mimetype.match(/image/g)) {
          uploadPath = scriptName + '/data/img/' + uuidv4();
          obj.mv(uploadPath, function (err) {
            if (err)
              return res.status(500).send(err)
          });
          Sources.push(uploadPath)
        } else if (obj.mimetype.match(/video/g)) {
          uploadPath = scriptName + '/data/video/' + uuidv4();
          obj.mv(uploadPath, function (err) {
            if (err)
              return res.status(500).send(err)
          });
          Sources.push(uploadPath)
        }
      })
    } else {
      if (sampleFile.mimetype.match(/image/g)) {
        uploadPath = scriptName + '/data/img/' + uuidv4();
        sampleFile.mv(uploadPath, function (err) {
          if (err)
            return res.status(500).send(err)
        });
        Sources.push(uploadPath)
      } else if (sampleFile.mimetype.match(/video/g)) {
        uploadPath = scriptName + '/data/video/' + uuidv4();
        sampleFile.mv(uploadPath, function (err) {
          if (err)
            return res.status(500).send(err)
        });
        Sources.push(uploadPath)
      }
    }

    res.send(Sources)
  }
}
