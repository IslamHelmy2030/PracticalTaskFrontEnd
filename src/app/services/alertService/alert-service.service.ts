import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root"
})
export class AlertService {
  constructor(private toastr: ToastrService) {}

  showSuccess(msg) {
    this.toastr.success(msg, "Success", {
      timeOut: 4000
    });
  }
  HandleError(error) {
    this.toastr.error(error, "Error", {
      timeOut: 4000
    });
  }
}
