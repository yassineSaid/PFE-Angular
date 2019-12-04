import { Component, OnInit } from '@angular/core';
import { AdminsService } from './admins.service';
import { Admin } from '../Models/admin';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  admins: Admin[];
  loading = true;
  constructor(private adminsService: AdminsService, private modalService: NgbModal) {
    adminsService.getAll().subscribe(success => {
      this.admins = success;
      this.loading = false;
    })
  }

  ngOnInit() {
  }

  openForm() {
    this.modalService.open(NgbdModalConfirm)
  }

}
@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Ajouter un administrateur</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form class="forms-sample" [formGroup]="adminForm">
    <div class="form-group">
      <label for="exampleInputEmail1">Nom</label>
      <input type="email" class="form-control is-invalid" id="nom" formControlName="nom" placeholder="Nom">
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Prenom</label>
      <input type="email" class="form-control" id="prenom" formControlName="prenom" placeholder="Prenom">
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Adresse Email</label>
      <input type="email" class="form-control" id="email" formControlName="email" placeholder="Adresse Email">
    </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input type="password" class="form-control" id="password" formControlName="password" placeholder="Mot de passe">
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" (click)="modal.dismiss('cancel click')">Annuler</button>
    <button type="button" class="btn btn-success" (click)="confirmer()">Confirmer</button>
  </div>
  `
})
export class NgbdModalConfirm {
  adminForm: FormGroup;
  errors;
  constructor(public modal: NgbActiveModal, private formBuilder: FormBuilder, private adminsService: AdminsService) {
    this.initForm();
  }
  initForm() {
    this.adminForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: ['']
    })
  }
  get AdminForm() {
    return this.adminForm;
  }
  get nom() {
    return this.adminForm.get("nom");
  }
  get prenom() {
    return this.adminForm.get("prenom");
  }
  get email() {
    return this.adminForm.get("email");
  }
  get password() {
    return this.adminForm.get("password");
  }
  confirmer() {
    this.adminsService.ajouter(this.nom.value, this.prenom.value, this.email.value, this.password.value).subscribe(
      success => {
        console.log(success);
      },
      error => {
        console.log(error);
        this.errors=error.error;
      },
      () => {

      }
    )
  }
}
