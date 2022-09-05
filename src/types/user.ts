import {Document} from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    readonly password: string;
    createdAt: Date;
}