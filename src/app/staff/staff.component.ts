import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api/api.service';
import { StaffMember } from '../api/models/staff-member.model';
import {query} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffMembers: StaffMember[] = [];
  filteredStaffMembers: StaffMember[] = [];
  positions: string[] = [];

  constructor(public apiService: ApiService,  private router: Router) {
  }

  ngOnInit() {
    console.log(this.apiService.StaffStorage)
    this.apiService.getStaffMembers().then(data => {
      this.staffMembers = data;
      this.filteredStaffMembers = this.staffMembers
    })

  }

  // Compares the query with the name and position of each member
  searchStaffMembers(searchQuery: string) {
    this.filteredStaffMembers = this.staffMembers.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Redirects to the detail page of a team member with the given ID.
  redirectToDetail(id: number) {
    this.router.navigate(['/staff-detail', id]);
  }

  protected readonly query = query;
  protected readonly JSON = JSON;
}
