import { S3ServiceImpl } from "../../frameworks/services/s3Service" 

export const s3ServiceInterface = (service:ReturnType<S3ServiceImpl>) =>{
   
    const upload = async(file:Express.Multer.File) => await service.uploadFile(file)

    const getFile = async(fileKey:string) =>await service.getFile(fileKey)

    const removeFile = async(fileKey:string)=> await service.removeFile(fileKey)

    return {
        upload,
        getFile,
        removeFile
    }
}

export type S3serviceInterface = typeof s3ServiceInterface;