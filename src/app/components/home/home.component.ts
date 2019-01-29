import { AlertService } from "./../../services/alertService/alert-service.service";
import { UserService } from "./../../services/userService/user-service.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  users;
  editing = {};
  modifiedUser = {
    userId: "",
    username: ""
  };
  deletedUserId;
  addUserForm = new FormGroup({
    username: new FormControl("")
  });
  @ViewChild(DatatableComponent) userTable: DatatableComponent;
  constructor(
    public userService: UserService,
    public alertService: AlertService,
    public ngxSmartModalService: NgxSmartModalService,
    private fb: FormBuilder
  ) {
    this.addUserForm = this.fb.group({
      username: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        if (response.body.status != 200) {
          this.alertService.HandleError(response.body.message);
          return false;
        }
        this.users = response.body.data;
      },
      error => {
        this.alertService.HandleError("Error Getting Users");
      }
    );
  }
  //show add user modal
  showAddUserModal(modalName) {
    this.ngxSmartModalService.open(modalName);
  }
  //delete modal
  addNewUser() {
    this.userService.AddUser(this.addUserForm.value).subscribe(
      (response: any) => {
        if (response.body.status != 201) {
          this.alertService.HandleError(response.body.message);
          return false;
        }
        this.alertService.showSuccess(response.body.message);
        this.getAllUsers();
        this.ngxSmartModalService.resetModalData("addUserModal");
        this.ngxSmartModalService.closeLatestModal();
      },
      error => {
        this.alertService.HandleError(error.error);
      }
    );
  }
  // update user
  updateValue(event, row, cell, rowIndex) {
    this.editing[rowIndex + "-" + cell] = false;
    this.users[rowIndex][cell] = event.target.value;
    this.modifiedUser.userId = row.userId;
    this.modifiedUser.username = row.username;
    this.userService.UpdateUser(this.modifiedUser);
    this.users = [...this.users];
  }
  //show delete user modal
  showDeleteUserModal(modalName, row) {
    this.ngxSmartModalService.open(modalName);
    this.deletedUserId = row.userId;
  }
  //delete user
  deleteUser() {
    this.userService.DeleteUser(this.deletedUserId).subscribe(
      (response: any) => {
        if (response.body.status != 204) {
          this.alertService.HandleError(response.body.message);
          return false;
        }
        this.alertService.showSuccess(response.body.message);
        this.getAllUsers();
        this.ngxSmartModalService.closeLatestModal();
        this.deletedUserId = null;
      },
      error => {
        this.alertService.HandleError(error.error);
      }
    );
  }
}
