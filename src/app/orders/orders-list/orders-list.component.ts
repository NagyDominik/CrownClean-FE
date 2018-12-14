import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../shared/services/order_service/order.service';
import { Order } from '../../shared/models/Order/order';
import { MatSnackBar, PageEvent } from '@angular/material';
import { TokenService } from 'src/app/shared/services/token_service/token.service';
import { UserService } from 'src/app/shared/services/user_service/user.service';
import { User } from 'src/app/shared/models/User/user';
import { OrderFilter } from 'src/app/shared/models/Order/OrderFilter';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  constructor(private orderService: OrderService,
              private userService: UserService,
              private tokenService: TokenService,
              public snackBar: MatSnackBar) { }

  isAdmin: boolean;
  currentUser: User;
  datasource: Order[];
  pageEvent: PageEvent;
  length: number;
  itemsPrPage: number;
  currentPage: number;

  ngOnInit() {
    this.itemsPrPage = 5;
    this.currentPage = 1;
    this.refresh();
  }

  refresh() {
    this.tokenService.isAdmin.subscribe(admin => {
      this.isAdmin = admin;
    });
    const filter = new OrderFilter();
    filter.currentPage = this.currentPage;
    filter.itemsPerPage = this.itemsPrPage;
    if (this.isAdmin) {
      this.orderService.getFilteredOrders(filter).subscribe(result => {
        this.datasource = result.list;
        this.length = result.count;
      },
        error => {
          console.log(error.message);
          this.openSnackBar(error.message);
        }
      );
    } else {
      this.tokenService.getUserFromToken().subscribe(user => {
        filter.userId = user.id;
        this.orderService.getFilteredOrders(filter).subscribe(result => {
          this.datasource = result.list;
          this.length = result.count;
        }, error => {
          console.log(error);
          this.openSnackBar(error.message);
        }
        );
      });
    }
  }

  delete(id: number) {
    this.orderService.deleteOrder(id).subscribe(message => {
      this.refresh();
      this.openSnackBar('Order has been deleted!');
    },
      error => {
        console.log(error);
        this.openSnackBar(error.error);
      }
    );
  }

  approve(id: number) {
    this.orderService.approveOrder(id).subscribe(message => {
      this.refresh();
      this.openSnackBar('Order has been approved!');
    },
      error => {
        console.log(error);
        this.openSnackBar(error.error);
      }
    );
  }

  getData(event: PageEvent) {
    const filter = new OrderFilter();
    filter.currentPage = event.pageIndex + 1;
    filter.itemsPerPage = event.pageSize;
    this.itemsPrPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.orderService.getFilteredOrders(filter).subscribe(result => {
      this.datasource = result.list;
      this.length = result.count;
    }, err => {
      console.log(err);
      this.openSnackBar('Unable to retrieve vehicles: ' + err.error);
    });
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 1500,
    });
  }
}
