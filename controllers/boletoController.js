import Boleto from '../models/Boleto.js';

export const getAllBoletos = async (req, res) => {
  try {
    const boletos = await Boleto.findAll();
    res.json(boletos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
