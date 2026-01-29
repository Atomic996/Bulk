
export interface Candidate {
  id: string;
  name: string;
  handle: string;
  profileUrl: string;
  avatarUrl: string;
  platform: 'Twitter';
  firstSeen: string;
  sharedCount: number;
}

export interface Vote {
  candidateId: string;
  known: boolean;
  timestamp: string;
}

export interface UserSession {
  permitId: string;
  votes: Vote[];
  remainingVotes: number;
}

export enum AppState {
  AUTH = 'AUTH',
  VOTING = 'VOTING',
  FINISHED = 'FINISHED'
}
