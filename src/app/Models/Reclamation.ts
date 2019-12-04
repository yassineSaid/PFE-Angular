import {Soutenance} from './soutenance';
import {Etudiant} from './etudiant';

export class Reclamation {
  idReclamation: number;
  textRec : string;
  dateAjout : Date;
  etudiant: Etudiant;
  soutenance: Soutenance;
}
