import mongoose from "mongoose";
const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type: String},
    user: string,
    instructions: list,
    ingredients: list
    // image: Image,
  },
  { collection: "recipes" });
export default recipeSchema;