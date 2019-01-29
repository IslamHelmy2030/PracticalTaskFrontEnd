import { AlertService } from "./../alertService/alert-service.service";
import { APIs } from "./../APIs/apis";
import { HttpService } from "./../httpService/http-service.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    public httpService: HttpService,
    public alertService: AlertService
  ) {}
  //get all users
  getAllUsers() {
    return this.httpService.getRequest(APIs.GetAllUsers);
  }
  //add user
  AddUser(user) {
    return this.httpService.postRequest(APIs.AddNewUser, user);
  }
  //update user
  UpdateUser(user) {
    return this.httpService.putRequest(APIs.UpdateUser, user).subscribe(
      (response: any) => {
        console.log(response);
        if (response.body.status != 202) {
          this.alertService.HandleError(response.body.message);
          return false;
        }
        this.alertService.showSuccess(response.body.message);
      },
      error => {
        this.alertService.HandleError(error.error);
      }
    );
  }
  //delete user
  DeleteUser(userId) {
    return this.httpService.deleteRequest(APIs.DeleteUser, userId);
  }
}
