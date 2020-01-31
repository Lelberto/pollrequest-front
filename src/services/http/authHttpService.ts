import HttpService from "./httpService";
import { User } from "../../models/User";

export class AuthHttpService extends HttpService {
    private routePrefix = '/auth';

    /**
     * Sign up a user.
     * 
     * @param user User
     * @return Promise<any>
     */
    async signUp(user: User): Promise<any> {
        // Initialize request options.
        const init: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                name: user.name,
                password: user.password,
            })
        };

        this.makeHttpReq(`${this.routePrefix}/signup`, init, false)
        // Manage promise return.
    }

    /**
     * Sign in a user.
     * 
     * @param email string
     * @param password string
     * @return Promise<any>
     */
    async signIn(user: User): Promise<any> {
        //Initialize request options.
        const init: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            })
        };

        this.makeHttpReq(`${this.routePrefix}/signin`, init, false);
        // Manage promise return.
    }
}