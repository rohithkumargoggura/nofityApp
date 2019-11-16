import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}

  getProducts() {
    //using get request
    return this.http.get("http://localhost:3000/getProducts").map(res => {
      console.log(res);
      return res;
    });
  }

  getUserOders() {
    return this.http.get("http://localhost:3000/userOrders").map(res => {
      console.log(res);
      return res;
    });
  }

  addOrder(product) {
    let headers = new HttpHeaders({ "content-type": "application/json" });
    headers.append("access_token", "abcd");
    //let options = new RequestOptions({headers:headers})
    return this.http
      .post("http://localhost:3000/orderProduct", product, { headers: headers })
      .map(res => {
        return res;
      });
  }
  cancelOrder(id) {
    let headers = new HttpHeaders({ "content-type": "application/json" });
    headers.append("access_token", "abcd");
    //let options = new RequestOptions({headers:headers})
    return this.http
      .post("http://localhost:3000/cancelOrder", id, { headers: headers })
      .map(res => {
        return res;
      });
  }
}
