import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api/api.service';
import { StaffMember } from '../api/models/staff-member.model';
import {query} from "@angular/animations";

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffMembers: StaffMember[] = [];
  filteredStaffMembers: StaffMember[] = [];
  positions: string[] = [];

  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
    console.log(this.apiService.StaffStorage)
    this.apiService.getStaffMembers().then(data => {
      this.staffMembers = data;
      this.filteredStaffMembers = this.staffMembers



    })

  }

  searchStaffMembers(searchQuery: string) {
    this.filteredStaffMembers = this.staffMembers.filter(member =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  protected readonly query = query;
  protected readonly JSON = JSON;
}
