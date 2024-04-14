// 1. Create an interface representing a document in MongoDB.
interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: number;
    address: string;
    updatedAt: number;
    deleted: number;
}

export { IUser }