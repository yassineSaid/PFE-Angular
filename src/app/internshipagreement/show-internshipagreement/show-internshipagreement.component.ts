import {Component, Inject, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import {User} from '../../Models/user';
import {Internship} from '../../Models/internship';
import {InternshipService} from '../internship.service';

@Component({
  selector: 'app-show-internshipagreement',
  templateUrl: './show-internshipagreement.component.html',
  styleUrls: ['./show-internshipagreement.component.scss']
})
export class ShowInternshipagreementComponent implements OnInit {

  edit: Boolean = false;
  user: User;
  internship: Internship;
  internship_id: any;
  notFound: any;
  constructor(private modal: NgbModal, private internshipService: InternshipService, private route: ActivatedRoute,
              @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.user = this.storage.get('user');
    if (this.user.role === 'Etudiant') {
      if (this.internship_id) {
        this.notFound = 'assets/images/404/404.png';
      } else {
        this.internshipService.studentInternship(this.user.id).subscribe(data => {
            this.internship = data;
        });
      }
    }
  }

  update() {
    this.edit = true;
  }
  hide() {
    this.edit = false;
  }

}
