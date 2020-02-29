import HttpService from './httpService';
import { User, ResponseUserLinksData, UserData } from '../../models/User';

export class UserHttpService extends HttpService {
    private routePrefix = '/users';

    /**
     * Gets the user from a provided token.
     * 
     * @returns Promise<ResponseUserLinksData>
     */
    public async getMyUser(): Promise<ResponseUserLinksData> {

        // Initialize request options.
        const init: RequestInit = {
            method: 'GET'
        };

        const resp = await this.makeHttpReq(`${this.routePrefix}/me`, init, true);

        try {
            if (resp) {
                return resp;
            }
        } catch (err) {
            console.log(err);
        }
    }


    /**
     * Gets all users.
     * 
     * @returns Promise<UserData[]>
     */
    public async getAllUsers(): Promise<UserData[]> {
        // Initialize request options.
        const init: RequestInit = {
            method: 'GET'
        };

        return await this.makeHttpReq(`${this.routePrefix}`, init, false);
    }

    /**
     * Gets a specific user.
     * 
     * @param user 
     * @returns Promise<UserData>
     */
    public async getUser(user: User): Promise<UserData> {
        // Initialize request options.
        const init: RequestInit = {
            method: 'GET'
        };

        return await this.makeHttpReq(`${this.routePrefix}/${user._id}`, init, false);
    }

    /**
     * Updates a user.
     * 
     * @param user 
     * @returns  Promise<UserData>
     */
    public async updateUser(user: User): Promise<UserData> {
        // Initialize request options.
        let data = ``;

        if (user.email !== undefined) {
            if (data !== ``) {
                data += `&email=${user.email}`;
            } else {
                data = `email=${user.email}`;
            }
        }

        if (user.name !== undefined) {
            if (data !== ``) {
                data += `&name=${user.name}`;
            } else {
                data = `name=${user.name}`;
            }
        }

        if (user.password !== undefined) {
            if (data !== ``) {
                data += `&password=${user.password}`;
            } else {
                data = `password=${user.password}`;
            }
        }

        const init: RequestInit = {
            method: 'PATCH',
            body: {
                data
            } as any
        };

        return await this.makeHttpReq(`${this.routePrefix}/${user._id}`, init, false);
    }
}
