import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    userId:{
      type:String,
      required:[true,"there is no userid"]
    },
    productName:{
      type:String,
      required:[true,"please add a title"]
    },
    price:{
      type:Number,
      required:[true,"please add a price"]
    },
    description:String,
    catagory:String,
    rating:Number,
    address:String,
    city:String,
    state:String,
    documents:Array,
    image:Array,
    reviews:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reviews'
      }
    ],
    reports:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reports'
      }
    ],
    featured:{
      type:Array,
      default:[]
    }
  },
  {timestamps: true}
);

const Products = model("Products",productSchema,"products")

export default Products;