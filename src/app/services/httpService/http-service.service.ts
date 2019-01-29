import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class HttpService {
  private _ApiUrl = "http://localhost:5555";

  constructor(private http: HttpClient) {}

  /** GET: Get Data From the server */
  getRequest(url): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(`${this._ApiUrl}${url}`, {
      observe: "response"
    });
  }
  /**Get Data From Server By Id */
  getRequestById(url, id: any): Observable<any> {
    return this.http.get<any>(`${this._ApiUrl}${url}/${id}`);
  }

  /** Post Requests To The Server */
  postRequest(url, data): Observable<HttpResponse<any[]>> {
    return this.http.post<any[]>(`${this._ApiUrl}${url}`, data, {
      observe: "response"
    });
  }
  singlePostRequest(url, data): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this._ApiUrl}${url}`, data, {
      observe: "response"
    });
  }
  /** Put Request To The server */
  putRequest(url, data): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this._ApiUrl}${url}`, data, {
      observe: "response"
    });
  }
  /**Delete Request To The Server */
  deleteRequest(url, id): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this._ApiUrl}${url}/${id}`, {
      observe: "response"
    });
  }
}
