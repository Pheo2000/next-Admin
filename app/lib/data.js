import { User , Product} from "./models";
import { connectToDB } from "./utils";

export const userFetch = async (q, page) => {

  const regex = new RegExp(q,"i")
  const ITEM_PER_PAGE = 3
  try {
    await connectToDB()
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({username: {$regex: regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1))
    return {users, count};
  } catch (error) {
    throw new Error("faied to fetch user");
  }
};


export const userProduct = async (q, page) => {

  const regex = new RegExp(q,"i")
  const ITEM_PER_PAGE = 2
  try {
    await connectToDB()
    const count = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({title: {$regex: regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1))
    return {products, count};
  } catch (error) {
    throw new Error("faied to fetch product");
  }
};


export const userFetchSinge = async (id) => {

  try {
    await connectToDB();
    const user = await User.findById(id);
    return user 
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};


export const productFetchSinge = async (id) => {
  try {
    await connectToDB();
    const product=  await Product.findById(id);
    return product
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};