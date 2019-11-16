import { Component } from "@angular/core";
import { ProductServiceService } from "./product-service.service";
import { PushNotificationsService } from "ng-push";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "notifyApp";
  allProducts;
  userOrders;
  sucessMessage = false;
  failureMessage = false;
  constructor(
    private productsService: ProductServiceService,
    private _pushNotifications: PushNotificationsService
  ) {
    this._pushNotifications.requestPermission();
  }

  ngOnInit() {
    console.log("in ts");
    this.productsService.getProducts().subscribe((data: any) => {
      this.allProducts = data;
      console.log(data);
    });
    this.productsService.getUserOders().subscribe(res => {
      this.userOrders = res;
    });
  }

  notify(data) {
    //our function to be called on click
    let options = {
      //set options
      body: data,
      icon: "src/assets/Notification.jpg" //adding an icon
    };
    this._pushNotifications.create("Notification", options).subscribe(
      //creates a notification
      res => console.log(res),
      err => console.log(err)
    );
  }

  orderItem(product) {
    console.log("id", product);
    product.status = "Orderd";
    console.log("id-after", product);
    this.productsService.addOrder(product).subscribe(res => {
      console.log("res", res);
      this.notify("Just now you orderd " + product.productName);
      this.sucessMessage = true;
      if (res) {
        this.productsService.getUserOders().subscribe(res => {
          this.userOrders = res;
          console.log("res", res);
        });
      }
    });
  }
  cancelOrder(product) {
    console.log("id-after", product.productId);
    this.productsService.cancelOrder(product.productId).subscribe(res => {
      console.log("res", res);
      this.notify("Just now you cancelled order " + product.productName);
    });
  }
}
