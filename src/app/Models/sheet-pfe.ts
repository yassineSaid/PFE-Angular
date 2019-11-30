import {Categorie} from './categorie';
import {Entreprise} from './entreprise';

export class SheetPFE {
  id: number;
  title: string;
  description: string;
  problematic: string;
  features: string;
  qrcode: string;
  categories: Categorie[];
  etat: string;
  entreprise: Entreprise;
}
