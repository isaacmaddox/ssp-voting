export interface Candidate {
  name: string;
  party: string;
  votes: number;
}

export interface Races {
  [key: string]: Candidate[];
}

export interface Winner {
  winner: string;
  votes: number;
}
