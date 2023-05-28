import Stripe from 'stripe';
import configKeys from '../../config';

const stripe = new Stripe(configKeys.STRIPE_SECERET_KEY, {
    apiVersion: '2022-11-15',});

export const stripeService = () => {
    const create = async(amount:number) =>{
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "INR",
            amount: amount,
            automatic_payment_methods: { enabled: true },
            description: "Your description here", 
          });
          return paymentIntent;
    }

    const cancel = async(paymentId:string) => await stripe.paymentIntents.cancel(paymentId);

    return{
        create,
        cancel
    }
}

export type StripeServiceImpl = typeof stripeService;