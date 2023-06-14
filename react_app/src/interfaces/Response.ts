import { User } from "./UserContext";

export interface UserPostResponse {
    message?: string;
    user?: User; // Replace 'any' with the actual type of your user object
}

export interface ErrorResponse {
    message: string;
}
