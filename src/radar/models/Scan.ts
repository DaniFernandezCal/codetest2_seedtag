import { Coordinates } from './Coordinates';
import { Enemy } from './Enemy';

export interface Scan {
  coordinates: Coordinates;
  enemies: Enemy;
  allies?: number;
}
