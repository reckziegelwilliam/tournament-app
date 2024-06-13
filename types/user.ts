export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

export enum Role {
    ADMIN,
    USER
};