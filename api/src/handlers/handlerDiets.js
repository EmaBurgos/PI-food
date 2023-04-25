const getDiets = require("../controllers/getDiets");

const handlerGetDiets = async (req, res) => {
  try {
    const dietas = await getDiets();
    res.status(200).json(dietas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handlerGetDiets;
