
export interface ReviewInterface{
    userId: string;
    productId: string;
    username: string;
    reviewText: string;
    rating: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ReportInterface{
    productId:string,
    userId:string,
    username:string,
    report:string,
    createdAt?: Date;
    updatedAt?: Date;
}
