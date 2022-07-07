export interface Message {
    id?: string;
    username: string;
    name: string;
    text: string;
    timestamp: Date;
    votes: number;
}