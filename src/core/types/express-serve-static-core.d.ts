import "express";

export interface UserData {
    username: string;
    email: string;
};

declare module "express-serve-static-core" {
    interface Request {
        user?: UserData
    }
}