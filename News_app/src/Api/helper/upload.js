const multer = require("multer");
const fs = require("fs");
const path = require("path");

const singleFileUpload = (basePath, name) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dynamicPath = path.join(__dirname, "../public" + basePath);

      // Check if the path exists, if not, create it
      if (!fs.existsSync(dynamicPath)) {
        fs.mkdirSync(dynamicPath, { recursive: true });
      }
      cb(null, dynamicPath);
    },

    filename: function (req, file, cb) {
      cb(null,   Date.now() + "-" + file.originalname.replace(/\s/g, "-").toLowerCase()
        // new Date().getTime() + file.originalname
        );
    },
  });

  return multer({
    storage: storage,
  }).single(name);
};

function multiDiffFileUpload(path, fieldConfigurations) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() + "-" + file.originalname.replace(/\s/g, "-").toLowerCase()
      );
    },
  });

  const uploadFields = fieldConfigurations.map((fieldConfig) => {
    return {
      name: fieldConfig.name,
      maxCount: fieldConfig.maxCount,
    };
  });

  const fileFilter = (req, file, cb) => {
    const allowedMimes = fieldConfigurations.find(
      (config) => config.name === file.fieldname
    ).allowedMimes;
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new Error("Invalid file type.");
      error.httpStatusCode = 422;
      error.errorMessage = "Invalid file type.";
      return cb(error);
    }
  };

  return multer({
    storage: storage,
    fileFilter: fileFilter,
  }).fields(uploadFields);
}

module.exports = { singleFileUpload, multiDiffFileUpload };
