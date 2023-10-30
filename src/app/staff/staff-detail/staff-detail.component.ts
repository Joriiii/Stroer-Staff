import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../api/api.service";
import { StaffMember } from "../../api/models/staff-member.model";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { query} from "@angular/animations";

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {

  // Form group to manage the staff member details
  staffMemberForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    position: new FormControl(''),
    birth: new FormControl('')
  });

  constructor(public apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // Get the 'id' parameter from the route
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null && id !== undefined) {
      // Convert 'id' to a number
      const parsedId = Number.parseInt(id);

      // Get the staff member details using the API service
      const staffMember = this.apiService.getUserById(parsedId);

      if (staffMember != null || staffMember != undefined) {
        // If staff member details are available, populate the form
        this.staffMemberForm.setValue({
          id: staffMember.id || '',
          name: staffMember.name || '',
          position: staffMember.position || '',
          birth: staffMember.birth || ''
        });
      }
    }
  }

  // Method to update a staff member's details
  public updateStaffMember() {
    let staffMember: StaffMember = {
      id: this.staffMemberForm.value.id,
      name: this.staffMemberForm.value.name,
      position: this.staffMemberForm.value.position,
      birth: this.staffMemberForm.value.birth
    }

    // Call the API service to update the staff member
    this.apiService.updateStaffMember(staffMember);
  }

  // Method to validate the birth date and form fields
  public validateDate() {
    const birthInput = document.getElementById('birth') as HTMLInputElement;
    const selectedDate = new Date(birthInput.value);
    const currentDate = new Date();

    if (selectedDate > currentDate || !birthInput.value) {
      // Show an alert if the date is invalid
      alert("Invalid date. Please select a valid birth date.");
      birthInput.value = ""; // Reset the input value if the date is invalid.
      return;
    }

    const nameInput = this.staffMemberForm.get('name')!;
    const positionInput = this.staffMemberForm.get('position')!;

    if (!nameInput.value || !positionInput.value) {
      // Show an alert if any of the form fields are empty
      alert("Please fill in all fields.");
      return;
    }

    // If date and fields are valid, update the staff member and navigate
    this.updateStaffMember();
    this.router.navigate(['/staff']);
  }

  // Method to cancel and reset the form
  public cancel() {
    this.staffMemberForm.reset();
    this.router.navigate(['/staff']);
  }

  // Additional query property (make sure it's defined somewhere)
  protected readonly query = query;
}
