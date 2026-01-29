
import { Candidate } from './types';

export const VOTE_LIMIT = 10;

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Codex Alpha',
    handle: '@codex_alpha',
    profileUrl: 'https://twitter.com/codex_alpha',
    avatarUrl: 'https://picsum.photos/seed/alpha/200',
    platform: 'Twitter',
    firstSeen: '2024-01-10',
    sharedCount: 5
  },
  {
    id: '2',
    name: 'Nebula Designer',
    handle: '@nebula_ui',
    profileUrl: 'https://twitter.com/nebula_ui',
    avatarUrl: 'https://picsum.photos/seed/nebula/200',
    platform: 'Twitter',
    firstSeen: '2024-01-12',
    sharedCount: 3
  },
  {
    id: '3',
    name: 'Crypto Sage',
    handle: '@cryptosage_eth',
    profileUrl: 'https://twitter.com/cryptosage_eth',
    avatarUrl: 'https://picsum.photos/seed/sage/200',
    platform: 'Twitter',
    firstSeen: '2024-01-15',
    sharedCount: 12
  },
  {
    id: '4',
    name: 'DAO Architect',
    handle: '@dao_arch',
    profileUrl: 'https://twitter.com/dao_arch',
    avatarUrl: 'https://picsum.photos/seed/arch/200',
    platform: 'Twitter',
    firstSeen: '2024-01-16',
    sharedCount: 8
  },
  {
    id: '5',
    name: 'Ether Flow',
    handle: '@eth_flow',
    profileUrl: 'https://twitter.com/eth_flow',
    avatarUrl: 'https://picsum.photos/seed/flow/200',
    platform: 'Twitter',
    firstSeen: '2024-01-18',
    sharedCount: 2
  },
  {
    id: '6',
    name: 'Web3 Builder',
    handle: '@w3_builder',
    profileUrl: 'https://twitter.com/w3_builder',
    avatarUrl: 'https://picsum.photos/seed/builder/200',
    platform: 'Twitter',
    firstSeen: '2024-01-19',
    sharedCount: 15
  },
  {
    id: '7',
    name: 'Token Master',
    handle: '@token_master',
    profileUrl: 'https://twitter.com/token_master',
    avatarUrl: 'https://picsum.photos/seed/token/200',
    platform: 'Twitter',
    firstSeen: '2024-01-20',
    sharedCount: 7
  },
  {
    id: '8',
    name: 'Block Voyager',
    handle: '@b_voyager',
    profileUrl: 'https://twitter.com/b_voyager',
    avatarUrl: 'https://picsum.photos/seed/voyager/200',
    platform: 'Twitter',
    firstSeen: '2024-01-21',
    sharedCount: 4
  }
];

export const VALID_PERMITS = ['BULK', 'CODEX-2024-001', 'BULK-BETA-007', 'DEVOPS-CODEX-99', 'TEST-KEY'];
