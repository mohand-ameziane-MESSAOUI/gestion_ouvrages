export interface Ouvrage {
  _id?: string;
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
  data: Ouvrage [];
  total: number;
  page: number;
  page_size: number;
  total_preter: number;
  total_disponible: number;
  total_ouvrages: number

}
