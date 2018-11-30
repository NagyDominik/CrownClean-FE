import { Vehicle } from './vehicle';
import { Order } from './order';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addresses: string[];
    vehicles: Vehicle[];
    orders: Order[];
    taxNumber: string;
    isCompany: boolean;
    isAdmin: boolean;
    isApproved: boolean;
}
