const multer = require("multer");

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./files/uploads/");
    },
  })
}).single("file");

module.exports=upload;