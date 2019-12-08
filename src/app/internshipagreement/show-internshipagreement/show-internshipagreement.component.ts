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
    this.route.params.subscribe(params => { this.internship_id = params['id']; });
    this.user = this.storage.get('user');
    if (this.user.role === 'Etudiant') {
      if (this.internship_id) {
        this.notFound = 'assets/images/404/404.png';
      } else {
        this.internshipService.studentInternship(this.user.id).subscribe(data => {
            this.internship = data;
        });
      }
    } else if (this.user.role === 'DirecteurDesStages') {
        this.internshipService.internship(this.internship_id).subscribe(data => {
          if (data) {
            this.internship = data;
          } else {
            this.notFound = 'assets/images/404/404.png';
          }
        }, error => {
          this.notFound = 'assets/images/404/404.png';
        });
    } else {
      this.notFound = 'assets/images/404/404.png';
    }
  }

  update() {
    this.edit = true;
  }
  hide(internship) {
    this.internship = internship;
    this.edit = false;
  }

  export() {
    this.internshipService.export(this.internship.id).subscribe((function (response) {
      console.log("kkk")
      var file = new Blob([response], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);}));
  }

}
