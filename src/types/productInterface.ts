export interface ProductDataInterface {
    userId?:string;
    productName: string;
    price: string;
    category: string;
    documents: { id: string; text: string }[];
    description: string;
    city: string;
    address: string;
    state: string;
    terms: boolean;
    image: string[];
    link: string[];
  }

export interface getProductInterface {
  _id:string;
  userId?:string;
    productName: string;
    price: string;
    category: string;
    documents: { id: string; text: string }[];
    description: string;
    city: string;
    address: string;
    state: string;
    terms: boolean;
    image: string[];
    link: string[];
    reviews:string[];
    reports:string[];
    featured:string[]
}