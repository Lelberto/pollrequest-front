import { Poll } from './Poll';

export class User {
    id?: string | null;
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
