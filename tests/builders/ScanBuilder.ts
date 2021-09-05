import { Coordinates } from '../../src/radar/models/Coordinates';
import { Enemy } from '../../src/radar/models/Enemy';
import { Scan } from '../../src/radar/models/Scan';

const getRandomInteger = () => {
  return Math.floor(Math.random() * 100);
};
const getRandomEnemyType = (): 'mech' | 'soldier' => {
  return Math.floor(Math.random() * enemyTypes.length) === 0
    ? 'mech'
    : 'soldier';
};
const enemyTypes = ['mech', 'soldier'];

export class ScanBuilder {
  private coordinates: Coordinates;
  private enemies: Enemy;
  private allies?: number;
  public constructor() {
    this.coordinates = {
      x: getRandomInteger(),
      y: getRandomInteger(),
    };
    this.enemies = {
      type: getRandomEnemyType(),
      number: getRandomInteger(),
    };
  }

  public withSoldierEnemy() {
    this.enemies = {
      type: 'soldier',
      number: getRandomInteger(),
    };
    return this;
  }

  public withRandomAttrs() {
    this.enemies = {
      type: getRandomEnemyType(),
      number: getRandomInteger(),
    };
    this.allies = getRandomInteger();
    return this;
  }

  public withMechEnemy() {
    this.enemies = {
      type: 'mech',
      number: getRandomInteger(),
    };
    return this;
  }

  public withRandomEnemy() {
    this.enemies = {
      type: getRandomEnemyType(),
      number: getRandomInteger(),
    };
    return this;
  }

  public withAlly(allies: number) {
    this.allies = allies;
    return this;
  }

  public build(): Scan {
    return {
      coordinates: this.coordinates,
      enemies: this.enemies,
      allies: this.allies,
    };
  }
}
