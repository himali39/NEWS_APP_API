const fs = require("fs");

// module.exports = deleteFiles = (files) => {
//   const basePath = "./public/" + files;
//   try {
//     //Delete multiple files
//     if (Array.isArray(files)) {
//       files.forEach((basePath) => {
//         console.log(basePath, "line no 11");

//         if (fs.existsSync(basePath)) {
//           fs.unlinkSync(basePath);
//         }
//       });
//     } else {
//       if (fs.existsSync(basePath)) {
//         fs.unlinkSync(basePath);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = deleteFiles = (files) => {
  try {
    console.log(files, "line no 27");

    // Delete multiple files
    if (Array.isArray(files)) {
      files.forEach((file) => {
        const basePath = "./public/" + file;

        console.log(basePath, "line no 34");

        if (fs.existsSync(basePath)) {
          fs.unlinkSync(basePath);
        }
      });
    } else {
      console.log("File error");
      const basePath = "./public/" + files;

      if (fs.existsSync(basePath)) {
        fs.unlinkSync(basePath);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
