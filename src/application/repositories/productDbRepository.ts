import { ProductRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/productRepository";
import { ProductDataInterface } from "../../types/productInterface";

export const productDbRepository = (repository:ReturnType<ProductRepositoryMongoDB>) => {
  const getAll = async () => await repository.getAllProducts()

  const getOneProduct = async(proId:string) => await repository.getProduct(proId)

  const deleteOneProduct = async(proId:string) => await repository.deleteProduct(proId)

  const reprots = async() => await repository.getReportedProducts()

  const getProductCount = async () => await repository.getProductCount();

  const getProductGraph =async () => await repository.getProductGraph();

  const getPieChartData =async () => await repository.getPieChart()

  const addProduct = async(data:ProductDataInterface) => await repository.addProduct(data)

  const findByField = async(filter:Object,limit:number) => await repository.findByField(filter,limit)

  const editProduct = async(id:object,data:object) => await repository.editProduct(id,data)

  const getFilteredProduct = async(searchCretiriya:object,page:number) =>{
    console.log(page,'page')
    const skip = page * 3;
    const products = await repository.getFilteredProduct(searchCretiriya,skip)
    // console.log(products)
    return products
  }

  const checkReview = async(proId:string,userId:string) => await repository.findReview(proId,userId)

  const addNewReview = async(data:object) => await repository.addReview(data)

  const checkReport = async(proId:string,userId:string) => await repository.findReport(proId,userId)

  const addNewReport = async(data:object) => await repository.addReport(data)

  const updateById = async(id:string,data:object) =>{
    console.log(id,'l')
    
    return await repository.findByIdAndUpdate(id,data)
  }
  return{
    getAll,
    getOneProduct,
    deleteOneProduct,
    reprots,
    getProductCount,
    getProductGraph,
    getPieChartData,
    addProduct,
    findByField,
    editProduct,
    getFilteredProduct,
    checkReview,
    addNewReview,
    checkReport,
    addNewReport,
    updateById
  } 
}

export type ProductDbInterface = typeof productDbRepository;