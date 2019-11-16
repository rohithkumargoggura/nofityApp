import { Component } from "@angular/core";
import { ProductServiceService } from "./product-service.service";

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
  constructor(private productsService: ProductServiceService) {}

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
  orderItem(product) {
    console.log("id", product);
    product.status = "Orderd";
    console.log("id-after", product);
    this.productsService.addOrder(product).subscribe(res => {
      console.log("res", res);
      this.sucessMessage = true;
      if (res) {
        this.productsService.getUserOders().subscribe(res => {
          this.userOrders = res;
          console.log("res", res);
        });
      }
    });
  }
  cancelOrder(id) {
    console.log("id-after", id);
    this.productsService.cancelOrder(id).subscribe(res => {
      console.log("res", res);
    });
  }
}
