import { Poll } from './Poll';

export class User {
    _id?: string | null;
    email: string;
    name?: string;
    password: string;
    polls?: Array<Poll>

    constructor(
        email: string,
        password: string,

    ) {
        this.email = email;
        this.password = password;
    }
}

export type UserData = {
    _id?: string;
    email: string;
    name: string;
    password: string;
    confirmPassword?: string;
    role: string;
}

// Response type link
export type LinkResponseData = {
    link: {
        rel: string,
        aciton: string,
        href: string
    }
}

// Response with a user & links
export type ResponseUserLinksData = {
    user: UserData,
    links: LinkResponseData[]
}