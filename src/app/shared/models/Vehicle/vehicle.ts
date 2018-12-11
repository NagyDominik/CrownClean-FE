import {User} from '../User/user';
import {Order} from '../Order/order';

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
