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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const stripe = new stripe_1.default(config_1.default.STRIPE_SECERET_KEY, {
    apiVersion: '2022-11-15',
});
const stripeService = () => {
    const create = (amount) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentIntent = yield stripe.paymentIntents.create({
            currency: "INR",
            amount: amount,
            automatic_payment_methods: { enabled: true },
            description: "Your description here",
        });
        return paymentIntent;
    });
    const cancel = (paymentId) => __awaiter(void 0, void 0, void 0, function* () { return yield stripe.paymentIntents.cancel(paymentId); });
    return {
        create,
        cancel
    };
};
exports.stripeService = stripeService;
