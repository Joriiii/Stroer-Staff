import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from './models/staff-member.model';
import { Observable } from 'rxjs';
import {StaffMemberPosition, StaffMemberPositionResponse} from "./models/staff-member-position";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private staffUrl = 'assets/mock-staffMember.json';
  private positionsUrl = 'https://ibillboard.com/api/positions';

  public StaffStorage: StaffMember[] = [];
  public positions: StaffMemberPosition[] = [];

  constructor(private http: HttpClient, private router: Router) {
  }

  public initOfData() {
    this.getStaffMembersInit().subscribe(x => x.map(c =>
      {this.StaffStorage.push(c)}
    ))

    this.getPositions().subscribe(x => {this.positions = x.positions, console.log(x)})
  }

  getStaffMembersInit(): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(this.staffUrl);
  }

  async getStaffMembers(): Promise<StaffMember[]> {
    return this.StaffStorage;
  }

  // Method to add new staff member
  public addStaffMembers() {
    const highestId = Math.max(...this.StaffStorage.map(member => member.id));

    const newStaff: StaffMember = {
      id: highestId + 1,
      name: '',
      position: '',
      birth: new Date().getDate()
    }

    this.StaffStorage.push(newStaff);
    this.router.navigate(['/staff-detail', newStaff.id]);
  }

  // Method to remove the staff member from the array by id
  public removeStaffMember(id:number): void {
    let item = this.StaffStorage.findIndex(x => x.id = id)
    if (item != null)
      this.StaffStorage.splice(item, 1);
  }

  // Method to update the staff member in the array
  public updateStaffMember(staffMember: StaffMember): void {
    let item = this.StaffStorage.find(x => x.id == staffMember.id);
    if (item != null) {
      item.name = staffMember.name
      item.birth = staffMember.birth
      item.position = staffMember.position
    }
  }

  getUserById(id: number): StaffMember | undefined {
    return this.StaffStorage.find(x => x.id == id);
  }

  getPositions(): Observable<StaffMemberPositionResponse> {
    return this.http.get<StaffMemberPositionResponse>(this.positionsUrl);
  }
}



