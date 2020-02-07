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
            body: new URLSearchParams(`email=${user.email}&name=${user.name}&password=${user.password}`)
        };

        return await this.makeHttpReq(`${this.routePrefix}/signup`, init, false)
            .then((resp: Response) => {
                if (resp) {
                    // Check custom errors
                    return resp;
                }
            })
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
            body: new URLSearchParams(`email=${user.email}&password=${user.password}`)
        };

        return await this.makeHttpReq(`${this.routePrefix}/signin`, init, false)
            .then((resp: Response) => {
                if (resp) {
                    return resp;
                }
            })
        // Manage promise return.
    }
}