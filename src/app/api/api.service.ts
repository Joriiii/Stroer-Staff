import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaffMember } from './models/staff-member.model';
import { Observable } from 'rxjs';
import { StaffMemberPosition, StaffMemberPositionResponse } from "./models/staff-member-position";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private staffUrl = 'assets/mock-staffMember.json';
  private positionsUrl = 'https://ibillboard.com/api/positions';

  // Array to store staff members
  public StaffStorage: StaffMember[] = [];

  // Array to store staff member positions
  public positions: StaffMemberPosition[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  // Initialize data from API and positions
  public initOfData() {
    // Get staff members from the API
    this.getStaffMembersInit().subscribe(data => {
      // Populate StaffStorage array with data
      this.StaffStorage.push(...data);
    });

    // Get staff member positions from the API
    this.getPositions().subscribe(response => {
      this.positions = response.positions;
      console.log(response);
    });
  }

  // Get initial staff members from a JSON file
  getStaffMembersInit(): Observable<StaffMember[]> {
    return this.http.get<StaffMember[]>(this.staffUrl);
  }

  // Get staff members from the in-memory storage
  async getStaffMembers(): Promise<StaffMember[]> {
    return this.StaffStorage;
  }

  // Method to remove a staff member from the array by ID
  public removeStaffMember(id: number): void {
    const index = this.StaffStorage.findIndex(x => x.id === id);
    if (index !== -1) {
      this.StaffStorage.splice(index, 1);
    }
  }

  // Method to add a new staff member
  public addStaffMembers() {
    const highestId = Math.max(...this.StaffStorage.map(member => member.id));

    const newStaff: StaffMember = {
      id: highestId + 1,
      name: '',
      position: '',
      birth: new Date().getDate()
    }

    // Add new staff member to StaffStorage
    this.StaffStorage.push(newStaff);

    // Navigate to staff detail page with new staff member ID
    this.router.navigate(['/staff-detail', newStaff.id]);
  }

  // Method to update a staff member in the array
  public updateStaffMember(staffMember: StaffMember): void {
    const item = this.StaffStorage.find(x => x.id == staffMember.id);
    if (item != null) {
      item.name = staffMember.name;
      item.birth = staffMember.birth;
      item.position = staffMember.position;
    }
  }

  // Get a specific staff member by ID
  getUserById(id: number): StaffMember | undefined {
    return this.StaffStorage.find(x => x.id == id);
  }

  // Get staff member positions from the API
  getPositions(): Observable<StaffMemberPositionResponse> {
    return this.http.get<StaffMemberPositionResponse>(this.positionsUrl);
  }
}
