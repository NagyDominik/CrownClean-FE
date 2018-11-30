import {User} from './user';
import {Order} from './order';

export class Vehicle {
    id: number;
    uniqueID: string;
    brand: string;
    type: string;
    size: number;
    internalPlus: boolean;
    user: User;
    orders: Order[];
}
