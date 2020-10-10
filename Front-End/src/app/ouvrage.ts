export interface Ouvrage {
  _id?: number;
  titre: string;
  auteur: string;
  ISBN: string;
  photo: any;
  maisonEdition: string;
  emplacementPhysique: string;
  genre: string;
  statut: string;
}

export interface OuvrageRespense{
  success: boolean;
  message: string;
  data: Ouvrage []

}
