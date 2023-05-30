import { UserDbInterface } from "../../repositories/userDbRepository";
import { ProductDbInterface } from "../../repositories/productDbRepository";

export const DashboardData =async (
  dbRepositoryUser:ReturnType<UserDbInterface>,
  dbRepositoryProduct:ReturnType<ProductDbInterface>,
):Promise<object> => {
  const [userCount, blockedCount, verifiedCount, productCount] = await Promise.all([
    dbRepositoryUser.getUserCount(),
    dbRepositoryUser.getCountOf({ isblocked: true }),
    dbRepositoryUser.getCountOf({ verified: true }),
    dbRepositoryProduct.getProductCount(),
  ]);

  const data = {
    userCount,
    blockedCount,
    verifiedCount,
    productCount,
  };

  return data;
}

export const ProductGraph = async(
  dbRepositoryProduct:ReturnType<ProductDbInterface>,
) => await dbRepositoryProduct.getProductGraph()

export const userGraph = async(
  dbRepositoryUser: ReturnType<UserDbInterface>
) => await dbRepositoryUser.getUserGraph()

export const pieChart = async(
  dbRepositoryProduct:ReturnType<ProductDbInterface>,
) => await dbRepositoryProduct.getPieChartData()