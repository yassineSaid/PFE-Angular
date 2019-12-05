import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {noWhitespaceValidator, removeSpaces} from '../validator';
import {Entreprise} from '../../Models/entreprise';
import {SheetService} from '../sheet.service';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../../Models/user';
import {SheetPFE} from '../../Models/sheet-pfe';

@Component({
  selector: 'app-add-sheetpfe',
  templateUrl: './add-sheetpfe.component.html',
  styleUrls: ['./add-sheetpfe.component.scss']
})
export class AddSheetpfeComponent implements OnInit {

  @Input() edit;
  @Input() sheet;
  @Output() out_sheet;
  @Output() hide = new EventEmitter<any>();
  sheetForm: FormGroup;
  listentreprises: Entreprise[];
  itemList = [];
  selectedItems = [];
  settings = {};

  constructor(private formBuilder: FormBuilder, private sheetService: SheetService) {}

  ngOnInit() {

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
      noteRapporteur: []
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

    this.sheetService.addSheet(this.sheetForm.value).subscribe(success => {
      console.log("efefefefef");
      this.hide.emit();
    });
  }
  editSheet() {
    this.sheetService.updateSheet(this.sheetForm.value).subscribe(success => {
      this.out_sheet.emit(this.sheetForm.value)
      this.hide.emit();
    });
  }
  cancel() {
    this.hide.emit();
  }
}
