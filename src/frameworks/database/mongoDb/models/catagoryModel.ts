import {Schema,model} from "mongoose"

const catagorySchema = new Schema(
  {
    title:{
      type:String,
      required:[true, "please add a title"]
    },
    description: String,
  }
)

const Catagory = model("Catagory",catagorySchema,"catagory")
export default Catagory;
