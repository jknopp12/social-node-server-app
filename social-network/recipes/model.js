import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("RecipesModel", schema);
export default model;