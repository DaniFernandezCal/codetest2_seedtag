import { Protocol } from './Protocols';
import { Scan } from './Scan';

export interface GetEnemyPositionRequestData {
  protocols: Protocol[];
  scan: Scan[];
}
