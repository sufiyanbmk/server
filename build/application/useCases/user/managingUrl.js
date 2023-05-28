"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSignedUrl = void 0;
function addSignedUrl(product, s3Services) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = product.map((product) => __awaiter(this, void 0, void 0, function* () {
            const signedUrls = yield Promise.all(product.image.map(s3Services.getFile));
            product.link = signedUrls;
            product.set("link", signedUrls, { strict: false });
            return product;
        }));
        const productsWithSignedUrls = yield Promise.all(promises);
        return productsWithSignedUrls;
    });
}
exports.addSignedUrl = addSignedUrl;
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
