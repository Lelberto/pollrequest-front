import { User } from "./User";
import { Poll } from "./Poll";

export class Comment {
    author: User;
    poll: Poll;
    content: string;

    constructor(
        author: User,
        poll: Poll,
        content: string
    ) {
        this.author = author;
        this.poll = poll;
        this.content = content;
    }
}