import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: String,
    // link to a user id
    // instructions - list
    // ingredients - list
    // image: Image,
  },
  { collection: "recipes" });
export default recipeSchema;