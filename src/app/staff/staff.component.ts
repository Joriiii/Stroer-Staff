import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StaffMember } from '../api/models/staff-member.model';
import { query } from "@angular/animations";
import { Router } from "@angular/router";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffMembers: StaffMember[] = [];
  filteredStaffMembers: StaffMember[] = [];
  positions: string[] = [];

  constructor(public apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    // Log the staff storage from ApiService
    console.log(this.apiService.StaffStorage);

    // Retrieve staff members from ApiService and initialize filtered list
    this.apiService.getStaffMembers().then(data => {
      this.staffMembers = data;
      this.filteredStaffMembers = this.staffMembers;
    });
  }

  // Search for staff members based on name or position
  searchStaffMembers(searchQuery: string) {
    this.filteredStaffMembers = this.staffMembers.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Add a new employee using ApiService
  public addNewEmployee() {
    this.apiService.addStaffMembers();
  }

  // Redirect to the detail page of a team member with the given ID
  redirectToDetail(id: number) {
    this.router.navigate(['/staff-detail', id]);
  }

  // Additional properties
  protected readonly query = query;
  protected readonly JSON = JSON;
}
