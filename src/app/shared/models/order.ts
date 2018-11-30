import {User} from './user';
import {Vehicle} from './vehicle';

export class Order {
  id: number;
  user: User;
  vehicle: Vehicle;
  orderDate: Date;
  approveDate: Date;
  services: string;
  description: string;
  atAddress: boolean;
  isApproved: boolean;
}
