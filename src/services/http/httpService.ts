import config from '../../configs/config.json';
import { ConfigType } from '../../shared/types/configType.js';
// import { ResponseType } from '../../shared/types/responseType';
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
        if (isTokenRequired) {
            // Get the stored token.
            await getItem(this._config.ACCESS_TOKEN_STORAGE_KEY)
                .then((token: string | null) => {
                    if (token) {
                        init = {
                            ...init,
                            headers: {
                                'X-ACCESS-TOKEN': token,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    }
                })
        }

        return await fetch(`${this._config.API_URL}${routePrefix}`, init)
            .then((resp: Response) => {
                if (resp.ok !== false) {
                    // Manage network errors here with a httpErrorService.ts
                    console.log(resp)
                    return resp;
                } else {
                    // Manage error handling
                    console.log('error');
                }
            })
            .catch((resp: any) => {
                console.log(resp.statusText)
            })
    }
}