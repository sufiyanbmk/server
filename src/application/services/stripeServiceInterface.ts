import { StripeServiceImpl } from "../../frameworks/services/stripeService";

export const stripeServiceInterface =(service:ReturnType<StripeServiceImpl>) => {
 const add = async (amount:number) => await service.create(amount)

 const callOff = async(paymentId:string) => await service.cancel(paymentId)

 return{
    add,
    callOff
 }

}

export type StripeServiceInterface = typeof stripeServiceInterface;