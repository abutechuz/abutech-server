const authJWT = require('../library/auth.js');
const docModel = require('../models/doc.js')

module.exports = {
  GET : async function (req, res) {
    var uploadPath ;
    var path = require('path');
    var scriptName = path.dirname(path.dirname(path.dirname(__filename)));
  
    uploadPath = scriptName + '/data/doc/brief.pdf';
    try {
      res.download(uploadPath);
    } catch (error) {
      res.send(error)
    }
  },
  POST: async function (req, res) {
    // authJWT(req)
    let sampleFile;
    let uploadPath;
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    
    var path = require('path');
    var scriptName = path.dirname(path.dirname(path.dirname(__filename)));
    
    sampleFile = req.files.sampleFile;
    
    if(sampleFile.mimetype.match(/application\/msword/g)||sampleFile.mimetype.match(/application\/pdf/g)){
      uploadPath = scriptName + `/data/doc/brief.pdf`;
      sampleFile.mv(uploadPath, function (err) {
        if (err)
        return res.status(500).send(err)
      });
      
      res.send(uploadPath)
    }else {
      res.send(new Error('Error'))
    };
  },
}
