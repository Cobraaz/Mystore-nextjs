import initDB from "../../helpers/initDB";
import Product from "../../models/Products";
initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;
    case "POST":
      addProduct(req, res);
      break;
  }
};

const getAllProducts = async (req, res) => {
  try {
    Product.find().then((products) => {
      res.status(200).json(products);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  const { name, price, description, mediaUrl } = req.body;
  try {
    if (!name || !price || !description || !mediaUrl)
      return res.status(422).json({ error: "Please add all the fields" });
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl,
    }).save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
};
