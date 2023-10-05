import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../api/api.service";
import {StaffMember} from "../../api/models/staff-member.model";
import {query} from "@angular/animations";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit{
  staffMembers: StaffMember[] = [];

  // get by id in URL (from StaffStorage)
  // create NGMODEL/FORM na tři pole
  // update poslanim do apiService.Update upraveneho modelu

  staffMemberForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    position: new FormControl(''),
    birth: new FormControl('')
  })

  constructor(public apiService: ApiService) {

    console.log(this.staffMembers)
  }

  ngOnInit() {
    const staffMember = this.apiService.getUserById(1);

    if (staffMember) {
      this.staffMemberForm.setValue({
        name: staffMember.name,
        position: staffMember.position,
        birth: staffMember.birth
      });
    }
  }
  protected readonly query = query;
}

