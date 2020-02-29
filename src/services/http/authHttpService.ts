import HttpService from "./httpService";
import { User } from "../../models/User";
import { saveItem } from '../../services/localStorageService';
import config from '../../configs/config.json';

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

        const resp = await this.makeHttpReq(`${this.routePrefix}/signup`, init, false)
        try {
            if (resp) {
                // Check custom errors (httpErrorService)
                return true;
            }
            return false;
        } catch (err) {
            console.log(err);
        }
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

        const resp = await this.makeHttpReq(`${this.routePrefix}/signin`, init, false);
        try {
            if (resp) {
                // Save both access and refresh tokens in localStorage               
                if (resp.access_token && resp.refresh_token) {
                    saveItem(config.ACCESS_TOKEN_STORAGE_KEY, resp.access_token);
                    saveItem(config.REFRESH_TOKEN_STORAGE_KEY, resp.refresh_token);

                    return true;
                }
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }
}
