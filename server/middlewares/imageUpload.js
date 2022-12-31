const multer = require("multer");

// handle storage using multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
