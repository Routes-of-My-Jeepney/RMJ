export type UserContextType = {
    login: (email: string, password: string) => Promise<any>; // replace 'any' with the type of the returned promise
    logout: () => Promise<void>;
    register: (
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    ) => Promise<any>; // replace 'any' with the type of the returned promise
    deleteUser: (userId: number) => Promise<void>;
    getUser: () => Promise<void>;
    isLoggedIn: boolean;
    user: User | null; // replace 'any' with the type of your user object
    setUser: (user: any | null) => void; // replace 'any' with the type of your user object
};

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
};
