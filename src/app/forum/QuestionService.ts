import { Injectable } from '@angular/core';
import {Question} from './Question';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  public host = '/api/rest/Question';
 public  QuestionUserUrl = 'http://localhost:9080/4twin3-osp-pfe-web/rest/Question';
  public QuestionUserUrl2 = 'http://localhost:9080/4twin3-osp-pfe-web/rest/Question/update';
  public QuestionUserUrl3 = 'http://localhost:9080/4twin3-osp-pfe-web/rest/Question/getqid';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getQuestion() {
    return this.http.get<Question[]>(this.QuestionUserUrl);
  }
  Mettreajour(id_Question) {
    return this.http.get<Question>(this.QuestionUserUrl2 + '/' + id_Question);
  }
  getQuestionid(id_Question) {
    return this.http.get<Question>(this.QuestionUserUrl3 + '/' + id_Question);
  }
  deleteqestion(id_Question) {
    return this.http.delete(this.QuestionUserUrl + '/' + id_Question); }

  ajouterquestion(question: Question): Observable<any> {
    return this.http.post(this.QuestionUserUrl, question, this.httpOptions );
  }

}
