import { User } from './User';

export type Poll = {
    _id: string,
    title: string,
    author: {
        id: string,
        email: string,
        name: string,
        password: string,
        role: User
    },
    options: {
        multiple: true,
        ipChecking: true
    },
    choices: [
        {
            id: string,
            label: string,
            voters: [
                {
                    ip: string,
                    voter: {
                        id: string,
                        email: string,
                        name: string,
                        password: string,
                        role: User
                    }
                }
            ]
        }
    ],
    comments: [
        {
            id: string,
            content: string,
            author: {
                id: string,
                email: string,
                name: string,
                password: string,
                role: User
            }
        }
    ]
}

/**
* Data require for post a poll.
*/
export type BasePoll = {
    id: string,
    title: string,
    options: {
        multiple: true,
        ipChecking: true
    }
}

/**
 * Scheme for a voter in a poll.
 */
export type PollUser = {
    id: string,
    email: string,
    name: string,
    password: string,
    role: User
}

/**
 * Specific way to PATCH a Poll. 
 */
export type PostPoll = {
    title: string,
    options: {
        multiple: true,
        ipChecking: true
    },
    choices: Choice[]
}

/**
 * Scheme list all choice in a poll.
 */
export type Choice = [
    {
        id: string,
        label: string,
        voters: [
            {
                ip: string,
                voter: PollUser
            }
        ]
    }
]
