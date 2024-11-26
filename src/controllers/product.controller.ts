import { Request, Response } from "express";
import { main } from "../models/user.model";

const queryProducts = async (_: Request, res: Response) => {
  const m = await main();
  res.json(await m.queryProducts());
};

const createProduct = async (
  req: Request<{}, {}, { productName: string; price: number }>,
  res: Response
) => {
  const m = await main();
  const product = await m.createProduct(req.body);
  res.json(product.id);
};

const updateProduct = async (
  req: Request<{}, {}, { productName: string; price: number; id: number }>,
  res: Response
) => {
  const m = await main();
  const product = await m.updateProduct(req.body);
  res.json(product.id);
};

const deleteProduct = async (
  req: Request<{}, {}, { id: number }>,
  res: Response
) => {
  const m = await main();
  const product = await m.deleteProduct(req.body);
  res.json(product.id);
};

export default { queryProducts, createProduct, updateProduct, deleteProduct };
