import HttpService from "./httpService";
import { User } from "../../models/User";
import { saveItem } from '../../services/localStorageService';
import config from '../../configs/config.json';

type SignInResponseData = {
    id: string,
    accessToken: string,
    refreshToken: string,
}

type SignUpResponseData = {
    links: Array<{
        rel: string,
        href: string
    }>,
    id: string
}

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
            .then((resp: SignUpResponseData) => {
                if (resp) {
                    // Check custom errors (httpErrorService)
                    return true;
                }
                return false;
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
            .then(async (resp: SignInResponseData) => {
                if (resp) {
                    // Save both access and refresh tokens in localStorage

                    if (resp.accessToken && resp.refreshToken) {
                        saveItem(config.ACCESS_TOKEN_STORAGE_KEY, resp.accessToken);
                        saveItem(config.REFRESH_TOKEN_STORAGE_KEY, resp.refreshToken);

                        return true;
                    }
                    return false;
                }
            })
        }
}
