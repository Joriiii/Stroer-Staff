import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api/api.service";
import { StaffMember } from "../../api/models/staff-member.model";
import { FormControl, FormGroup } from "@angular/forms";
import { query } from "@angular/animations";
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {

  staffMemberForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    position: new FormControl(''),
    birth: new FormControl('')
  });

  constructor(public apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      const parsedId = Number.parseInt(id);
      const staffMember = this.apiService.getUserById(parsedId)

      if (staffMember != null || staffMember != undefined) {
        console.log(staffMember.name)
        this.staffMemberForm.setValue({
          id: staffMember.id || '',
          name: staffMember.name || '',
          position: staffMember.position || '',
          birth: staffMember.birth || ''
        });
      }
    }
  }

  // Method to add a new staff member to the list via the API service
  public updateStaffMember() {
    let staffMember: StaffMember = {
      id: this.staffMemberForm.value.id,
      name: this.staffMemberForm.value.name,
      position: this.staffMemberForm.value.position,
      birth: this.staffMemberForm.value.birth
    }
    this.apiService.updateStaffMember(staffMember)
  }

  public validateDate() {
    const birthInput = document.getElementById('birth') as HTMLInputElement;

    const selectedDate = new Date(birthInput.value);
    const currentDate = new Date();

    if (selectedDate > currentDate || !birthInput.value) {
      alert("Invalid date. Please select a valid birth date.");
      birthInput.value = ""; // Reset the input value if the date is invalid.
    }
    else {
      this.updateStaffMember();
      this.router.navigate(['/staff']);
    }
  }

  protected readonly query = query;
}
