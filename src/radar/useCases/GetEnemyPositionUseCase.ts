import { Coordinates } from '../models/Coordinates';
import { GetEnemyPositionRequestData } from '../models/GetEnemyPositionRequestData';

export interface GetEnemyPositionUseCases {
  getEnemyPosition(data: GetEnemyPositionRequestData): Coordinates;
}
