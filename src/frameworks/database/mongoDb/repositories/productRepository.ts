import { ProductDataInterface } from "../../../../types/productInterface";
import Products from "../models/productModel";
import Reports from "../models/reportModel";
import Reviews from "../models/reviewModel";

export const productRepositoryMongoDB = () => {
  const getAllProducts = async () => await Products.find();

  const getProduct = async (proId: string) => await Products.findById(proId).populate({ path: 'reviews', model: 'Reviews' });

  const deleteProduct = async (proId: string) =>
    await Products.findByIdAndDelete(proId);

  const getReportedProducts = async () =>
    await Products.find({ reports: { $size: 1 } })
      .populate({
        path: "reports",
        select: "username report",
        model: "Report",
      });

  const getProductCount = async () => 
    await Products.countDocuments();

  const getProductGraph = async() =>{
    const counts = await Products.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    return counts;
  }
    
  const getPieChart = async () => {
    const featuredProduct = await Products.countDocuments({ featured: { $exists: true, $ne: [] } });
    const product = await Products.countDocuments({ featured: { $exists: false, $not: { $gt: 0 } } });
    return { product: product, featuredProduct: featuredProduct };
  };

  const addProduct = async(data:ProductDataInterface) => 
    await Products.create(data)
  
  const findByField = async(filter:object) => await Products.find(filter).sort({ createdAt: -1 });

  const editProduct = async(id:object,data:object) => await Products.updateOne(id,data)

  const getFilteredProduct = async(searchCretiriya:object,skip:number) => {
   const product = await Products.find(searchCretiriya)
    .sort({featured: -1,createdAt: -1})
    .populate({ path: 'reviews', model: Reviews })
    .skip(skip).limit(3)
    return product;
  }

  const findReview = async(proId:string,userId:string) => await Reviews.find({proId,userId})

  const addReview = async(data:object) => await Reviews.create(data)

  const findReport = async(proId:string,userId:string) => await Reports.find({proId,userId})

  const addReport = async(data:object) => await Reports.create(data)

  const findByIdAndUpdate = async(id:string,data:object) => await Products.findByIdAndUpdate(id,data)


  return {
    getAllProducts,
    getProduct,
    deleteProduct,
    getReportedProducts,
    getProductCount,
    getProductGraph,
    getPieChart,
    addProduct,
    findByField,
    editProduct,
    getFilteredProduct,
    findReview,
    addReview,
    findReport,
    addReport,
    findByIdAndUpdate
  };
};

export type ProductRepositoryMongoDB = typeof productRepositoryMongoDB;
