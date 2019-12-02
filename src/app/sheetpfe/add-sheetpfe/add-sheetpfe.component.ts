import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {noWhitespaceValidator, removeSpaces} from '../validator';
import {Entreprise} from '../../Models/entreprise';
import {Categorie} from '../../Models/categorie';
import {SheetService} from '../sheet.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../../Models/user';

@Component({
  selector: 'app-add-sheetpfe',
  templateUrl: './add-sheetpfe.component.html',
  styleUrls: ['./add-sheetpfe.component.scss']
})
export class AddSheetpfeComponent implements OnInit {

  @Input() edit
  @Output() hide = new EventEmitter<any>();
  sheetForm: FormGroup;
  listentreprises: Entreprise[];
  listcategories: Categorie[];
  constructor(private formBuilder: FormBuilder, private sheetService: SheetService) { }

  ngOnInit() {
    this.sheetService.categories().subscribe(data => {
      if (data) {
        this.listcategories = data;
      }
    });

    this.sheetService.entreprises().subscribe(data => {
      if (data) {
        this.listentreprises = data;
      }
    });
    this.sheetForm =  this.formBuilder.group({
      title: ['', [ Validators.required, Validators.minLength(10), removeSpaces, noWhitespaceValidator ]],
      description: ['', [ Validators.required, Validators.minLength(30), removeSpaces, noWhitespaceValidator ]],
      problematic: ['', [ Validators.required, Validators.minLength(30), removeSpaces, noWhitespaceValidator ]],
      features: ['', [ Validators.required, Validators.minLength(30), removeSpaces, noWhitespaceValidator ]],
      categories: this.formBuilder.array([
             this.formBuilder.group({
               id: ['', [ Validators.required]]
            }),
      ]),
      entreprise: this.formBuilder.group({
        id: ['', [ Validators.required ]]
      }),
    });
  }

  get title() {
    return this.sheetForm.get('title');
  }
  get description() {
    return this.sheetForm.get('description');
  }
  get problematic() {
    return this.sheetForm.get('problematic');
  }
  get features() {
    return this.sheetForm.get('features');
  }
  get categories() {
    return this.sheetForm.get('categories');
  }
  get entreprise() {
    return this.sheetForm.get('entreprise');
  }

  addSheet() {

    this.sheetService.addSheet(this.sheetForm.value).subscribe(success => {
      if (success) {
        this.hide.emit();
      }
    });
  }
  editSheet() {

  }

  cancel() {
    this.hide.emit();
  }
}
