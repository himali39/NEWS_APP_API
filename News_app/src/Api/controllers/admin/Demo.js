const abc = require("../../models/abc");

/* -------------------------------add Personalize data------------------------------ */
const demo = async (req, res) => {
  try {
    // const myData = await req.body;

    // if (req.files["flag_image"][0]) {
    //   myData.flag_image = await req.files["flag_image"][0].filename;
    // }

    // if (req.files["json_file"][0]) {
    //   myData.json_file = await req.files["json_file"][0].filename;
    // }

    const myData = req.body || {};
    if (req.files["flag_image"] && req.files["flag_image"][0]) {
      myData.flag_image = req.files["flag_image"][0].filename;
    }

    if (req.files["json_file"] && req.files["json_file"][0]) {
      myData.json_file = req.files["json_file"][0].filename;
    }
    console.log(myData);
    await abc.create(myData);

    // const result = await newNoti.save();

    res.status(200).json({
      success: true,
      message: ` data add successfully!`,
      // data: newNoti,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { demo };
