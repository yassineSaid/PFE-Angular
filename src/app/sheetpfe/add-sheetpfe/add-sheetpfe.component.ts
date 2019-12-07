import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {noWhitespaceValidator, removeSpaces} from '../validator';
import {Entreprise} from '../../Models/entreprise';
import {SheetService} from '../sheet.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../../Models/user';
import {SheetPFE} from '../../Models/sheet-pfe';
import {InternshipService} from '../../internshipagreement/internship.service';

@Component({
  selector: 'app-add-sheetpfe',
  templateUrl: './add-sheetpfe.component.html',
  styleUrls: ['./add-sheetpfe.component.scss']
})
export class AddSheetpfeComponent implements OnInit {

  @Input() edit;
  @Input() sheet;
  @Output() hide = new EventEmitter<any>();
  user: User;
  sheetForm: FormGroup;
  listentreprises: Entreprise[];
  itemList = [];
  selectedItems = [];
  settings = {};

  constructor(private formBuilder: FormBuilder, private sheetService: SheetService,
              private internshipService: InternshipService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {}

  ngOnInit() {
    this.user = this.storage.get('user')
    this.sheetService.categories().subscribe(data => {
      if (data) {
        this.itemList = data;
      }
    });

    this.sheetService.entreprises().subscribe(data => {
      if (data) {
        this.listentreprises = data;
      }
    });

    if (this.edit === false) {
      this.internshipService.studentInternship(this.user.id).subscribe(data => {
        if (data) {
          this.entreprise.get('id').setValue(data.entreprise.id);
        }
      });
    }

    this.sheetForm =  this.formBuilder.group({
      id: [],
      title: ['', [ Validators.required, Validators.minLength(10), removeSpaces, noWhitespaceValidator ]],
      description: ['', [ Validators.required, Validators.minLength(30), removeSpaces, noWhitespaceValidator ]],
      problematic: ['', [ Validators.required, Validators.minLength(30), removeSpaces, noWhitespaceValidator ]],
      features: ['', [ Validators.required, Validators.minLength(30), removeSpaces, noWhitespaceValidator ]],
      categories: [[], Validators.required],
      entreprise: this.formBuilder.group({
        id: ['', [ Validators.required ]]
      }),
      etat: [],
      qrcode: [],
      note: [],
      noteEncadreur: [],
      noteRapporteur: [],
      enseignantsheet: []
    });


    this.settings = {
      text: '',
      classes: 'myclass custom-class',
      labelKey: 'name',
      enableCheckAll: false
    };

    if (this.sheet) {
      this.sheetForm.patchValue(this.sheet);
      this.selectedItems = this.sheet.categories;
    }
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
    this.sheetForm.setErrors({'submit': true});
    this.sheetService.addSheet(this.sheetForm.value).subscribe(success => {
      this.sheet = this.sheetForm.value;
      this.sheet.entreprise = this.listentreprises.filter(e => e.id.toString() === this.entreprise.get('id').value.toString())[0];
      this.hide.emit(this.sheet);
    });
  }
  editSheet() {
    this.sheetForm.setErrors({'submit': true});
    this.sheetService.updateSheet(this.sheetForm.value).subscribe(success => {
      this.sheet = this.sheetForm.value;
      this.sheet.entreprise = this.listentreprises.filter(e => e.id.toString() === this.entreprise.get('id').value.toString())[0];
      this.hide.emit(this.sheet);
    });
  }
  cancel() {
    this.hide.emit(this.sheet);
  }
  onDeSelectAll(items: any) {
    this.categories.setValue(items);
  }
}
