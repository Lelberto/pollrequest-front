import HttpService from "./httpService";
import { Poll, PostPoll, BasePoll } from '../../models/Poll';

export class PollHttpService extends HttpService {
    private routePrefix = '/polls'

    /**
     * Add a poll.
     * 
     * @param poll PostPoll
     * @returns Promise<PostPoll>
     */
    async addPoll(poll: PostPoll): Promise<PostPoll> {

        const init: RequestInit = {
            method: 'POST'
        };

        const resp = await this.makeHttpReq(`${this.routePrefix}`, init, false);

        try {
            return await resp.json();
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Deletes a poll.
     * 
     * @param string
     * @returns Promise<Poll>
     */
    async deletePoll(id: string): Promise<Poll> {
        const init: RequestInit = {
            method: 'DELETE'
        };
        return await this.makeHttpReq(`${this.routePrefix}/${id}`, init, false);
    }

    /**
     * Gets all polls.
     * 
     * @returns Promise<Poll[]>
     */
    async getAllPolls(): Promise<Poll[]> {
        const init: RequestInit = {
            method: 'GET'
        };

        const resp = await this.makeHttpReq(`${this.routePrefix}`, init, false);

        try {
            return await resp.polls;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Update a poll.
     * 
     * @param poll BasePoll
     */
    async updatePoll(poll: BasePoll): Promise<Poll[]> {
        const init: RequestInit = {
            method: 'PATCH'
        };

        const resp = await this.makeHttpReq(`${this.routePrefix}/${poll.id}`, init, false);

        try {
            return await resp;
        } catch (err) {
            console.log(err);
        }
    }

}
