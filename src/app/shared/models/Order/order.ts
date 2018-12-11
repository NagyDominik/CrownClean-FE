import {User} from '../User/user';
import {Vehicle} from '../Vehicle/vehicle';

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
