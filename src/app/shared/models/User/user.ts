import { Vehicle } from '../Vehicle/vehicle';
import { Order } from '../Order/order';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    phoneNumber: string;
    addresses: string[];
    vehicles: Vehicle[];
    orders: Order[];
    taxNumber: string;
    isCompany: boolean;
    isAdmin: boolean;
    isApproved: boolean;
}
