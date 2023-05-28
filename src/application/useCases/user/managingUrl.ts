import {ProductDataInterface} from '../../../types/productInterface'
import { S3serviceInterface } from '../../services/s3ServiceInterface';
import { UserReturnInterface } from '../../../types/userInterface';


export async function addSignedUrl(
    product:ProductDataInterface[],
    s3Services:ReturnType<S3serviceInterface>
):Promise<ProductDataInterface[]>{
    const promises = product.map(async (product : any) => {
        const signedUrls = await Promise.all(product.image.map(s3Services.getFile));
        product.link = signedUrls;
        product.set("link",signedUrls,{strict:false})
        return product;
    });
    
    const productsWithSignedUrls = await Promise.all(promises);  
    return productsWithSignedUrls;
}

// export async function addProfileUrl(
//     data:UserReturnInterface[],
//     s3Services:ReturnType<S3serviceInterface>    
// ):Promise<any>{
//     const participantsWithImageUrls = await Promise.all(
//         data.map(async (x) => {
//           x.profileImage = await s3Services.getFile(x.profileImage);
//           return x;
//         })
        
// }