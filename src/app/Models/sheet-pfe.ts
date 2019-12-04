import {Categorie} from './categorie';
import {Entreprise} from './entreprise';
import {Etudiant} from './etudiant';
import {Enseignantsheet} from './enseignantsheet';

export class SheetPFE {
  id: number;
  title: string;
  description: string;
  problematic: string;
  features: string;
  qrcode: string;
  note: string
  noteRapporteur: number;
  noteEncadreur: number;
  categories: Categorie[];
  etat: string;
  entreprise: Entreprise;
  etudiant: Etudiant;
  enseignantsheet: Enseignantsheet[];
}
