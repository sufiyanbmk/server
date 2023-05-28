import { AdminRepositoryDbReturnMongoDB } from '../../frameworks/database/mongoDb/repositories/adminRepository'


export const adminDbRepository = (repository:AdminRepositoryDbReturnMongoDB ) => {
  
  const getAdminByEmail = async(email:string) => await repository.getAdminByEmail(email)

  return{
     getAdminByEmail,
 
    }
}

export type AdminDbInterface = typeof adminDbRepository