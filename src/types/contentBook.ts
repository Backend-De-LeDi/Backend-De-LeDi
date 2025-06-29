export interface ContentBook {
  url_secura: string;
  idContentBook: string;
}

export interface FullContentBook extends ContentBook {
  _id: string;
  __v: number;
}

export interface ContentAudioBook extends Omit<ContentBook, "idContentBook"> {
  idAudio: string;
}
