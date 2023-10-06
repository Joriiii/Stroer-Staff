import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from './models/staff-member.model';
import { Observable } from 'rxjs';
import {StaffMemberPosition, StaffMemberPositionResponse} from "./models/staff-member-position";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private staffUrl = 'assets/mock-staffMember.json';
  private positionsUrl = 'https://ibillboard.com/api/positions';

  public StaffStorage: StaffMember[] = [];
  public positions: StaffMemberPosition[] = [];

  constructor(private http: HttpClient) {
  }

  public initOfData() {
    this.getStaffMembersInit().subscribe(x => x.map(c =>
    {this.StaffStorage.push(c)}
    ))

    this.getPositions().subscribe(x => {this.positions = x.positions, console.log(x)})

    console.log("init!!")
  }

  getStaffMembersInit(): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(this.staffUrl);
  }

  async getStaffMembers(): Promise<StaffMember[]> {
    return this.StaffStorage;
  }

  public addStaffMembers() {
    var newStaff : StaffMember = {
      id: 0,
      name : 'test',
      position : 'test',
      birth: new Date().getDate()
    }
    this.StaffStorage.push(newStaff)
  }

  public removeStaffMember(id:number): void {
    var itemToRemove = this.StaffStorage.findIndex(x => x.id = id)
    this.StaffStorage.splice(itemToRemove, 1);
  }

  public updateStaffMember(staffMember: StaffMember): void {
    var itemtoupdate = this.StaffStorage?.find(x => x.id == staffMember.id);
  debugger
    if (itemtoupdate != null) {
      itemtoupdate.name = staffMember.name
      itemtoupdate.birth = staffMember.birth
      itemtoupdate.position = staffMember.position
    }
  }

  getUserById(id: number): StaffMember | undefined {
    return this.StaffStorage.find(x => x.id == id);
  }

  getPositions(): Observable<StaffMemberPositionResponse> {
    return this.http.get<StaffMemberPositionResponse>(this.positionsUrl);
  }
}



