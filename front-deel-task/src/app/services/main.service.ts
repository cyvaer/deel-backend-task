import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getContractById(){
    return this.http.get(`${environment.baseUrl}/contracts/1?profile_id=1`,{});
  }

  getAllProfileRelatedContracts(){
    return this.http.get(`${environment.baseUrl}/contracts?profile_id=7`,{});

  }

  getProfileRelatedUnpaidJobs(){
    return this.http.get(`${environment.baseUrl}/jobs/unpaid?profile_id=1`,{});
  }

  payJobToContractor(){
    return this.http.post(`${environment.baseUrl}/jobs/1/pay/?profile_id=1`,{});
  }

  depositMoneyToClientAccount(){
    return this.http.post(`${environment.baseUrl}/balances/deposit/1?profile_id=1`,{amount: 1000});
  }

  getBestProfession(){
    return this.http.get(`${environment.baseUrl}/admin/best-profession?profile_id=1&start=2020-08-15&end=2022-08-15`,{});
  }

  getBestClients(){
    return this.http.get(`${environment.baseUrl}/admin/best-clients?profile_id=1&start=2020-08-14&end=2020-08-17&limit=3`,{});
  }

}
