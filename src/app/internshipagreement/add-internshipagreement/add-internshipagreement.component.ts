import {Component, Input, OnInit} from '@angular/core';
import {Internship} from '../../Models/internship';
import {noWhitespaceValidator, removeSpaces} from '../../sheetpfe/validator';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SheetService} from '../../sheetpfe/sheet.service';
import {Entreprise} from '../../Models/entreprise';

@Component({
  selector: 'app-add-internshipagreement',
  templateUrl: './add-internshipagreement.component.html',
  styleUrls: ['./add-internshipagreement.component.scss']
})
export class AddInternshipagreementComponent implements OnInit {
  @Input() internship: Internship;
  @Input() edit;
  entreprises: Entreprise[];
  internshipForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private sheetService: SheetService) { }

  ngOnInit() {
    this.sheetService.entreprises().subscribe(data => {
      if (data) {
        this.entreprises = data;
      }
    });

    this.internshipForm =  this.formBuilder.group({
      id: [],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      entreprise: this.formBuilder.group({
        id: ['', [ Validators.required ]]
      }),
    });

    if (this.internship) {
      this.internshipForm.patchValue(this.internship);
    }
  }

  get startDate() {
    return this.internshipForm.get('startDate');
  }
  get endDate() {
    return this.internshipForm.get('endDate');
  }
  get entreprise() {
    return this.internshipForm.get('entreprise');
  }

  addInternship(){
  }
  editInternship(){
  }
  cancel(){
  }
}
