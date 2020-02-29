import config from '../../configs/config.json';
import { ConfigType } from '../../shared/types/configType.js';
import { getItem } from '../localStorageService';

export default class HttpService {
    protected _config: ConfigType;

    constructor() {
        this._config = config;
    }

    /**
     * Make every http request.
     * 
     * Use this function to set special headers (like tokens).
     * Use it to decode response and manage errors too.
     * 
     * @param routePrefix string
     * @param init RequestInit
     * @param isTokenRequired boolean
     * @return Promise<any>
     */
    protected async makeHttpReq(routePrefix: string, init: RequestInit, isTokenRequired: boolean): Promise<any> {

        // Stock the token on 
        try {
            if (isTokenRequired) {
                // Get the stored token.
                const token = await getItem(this._config.ACCESS_TOKEN_STORAGE_KEY);
                if (token) {
                    init = {
                        ...init,
                        headers: {
                            'x-access-token': token,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }

        // Launch road and get his status before sending a json body with all data
        try {
            const resp = await fetch(`${this._config.API_URL}${routePrefix}`, init);
            if (resp.status) {
                const errorPrefix = String(resp.status).substring(0, 1);
                if (errorPrefix === "4" || errorPrefix === "5") {
                    alert("Le serveur retourne une erreur " + resp.status + ".");
                    // Manage errors (httpErrorService wip)
                } else if (errorPrefix === "2") {
                    // All is good.
                } else {
                    // Manage errors (httpErrorService wip)
                }
            }
            return await resp.json();
        } catch (err) {
            console.log(err);
        }
    }
}
