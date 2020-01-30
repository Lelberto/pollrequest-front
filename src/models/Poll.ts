import { User } from './User';
import { Comment } from './Comment';

type pollOptions = {
    multiple: boolean,
    ipChecking: boolean,
};

type pollVoter = {
    ip: string,
    voter: User,
};

type pollChoice = {
    _id: string,
    label: string,
    voters: pollVoter
};

export class Poll {
    title: string;
    author: User;
    options: pollOptions;
    choices: Array<pollChoice>;
    comments?: Array<Comment>;

    constructor(
        title: string,
        author: User,
        options: pollOptions,
        choices: Array<pollChoice>,
    ) {
        this.title = title;
        this.author = author;
        this.options = options;
        this.choices = choices;
    }
}