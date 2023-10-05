import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiUrl = 'assets/mock-staffMember.json';

  constructor(private http: HttpClient) { }


}
