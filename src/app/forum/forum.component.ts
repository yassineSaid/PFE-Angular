import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Question} from './Question';
import {Reponse} from './Response';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from './QuestionService';
import {ResponseSrvice} from './ResponseSrvice';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForumComponent implements OnInit {
  Questions: Question[] = [];
  question: Question;
  Reponses: Reponse[] = [];
  reponse: Reponse;

  constructor(private route: ActivatedRoute, private questionservice: QuestionService , private reponseservice: ResponseSrvice) {
  }
  private questionf = new FormGroup({
    contenu: new FormControl('', [Validators.required]),
    etat: new FormControl('', )
  });
  private reponsef = new FormGroup({
    contenu: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.questionservice.getQuestion()
      .subscribe(
        data => {
          this.Questions = data ;
        }
      );
  }
  get Contenu() {
    return this.questionf.get('contenu');
  }
  get etat() {
    return this.questionf.get('etat');
  }
  ajouter() {
    this.question = new Question(this.questionf.value['contenu'], this.questionf.value['etat']);
    console.log(this.question);
    this.questionservice.ajouterquestion(this.question).subscribe()
    ;
    this.questionf.reset();
  }
  supprimer(id_Question: number) {
    console.log(this.question);
    this.questionservice.deleteqestion(id_Question).subscribe()
    ;

  }

}
