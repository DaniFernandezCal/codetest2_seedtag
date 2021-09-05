import { Coordinates } from '../models/Coordinates';
import { GetEnemyPositionRequestData } from '../models/GetEnemyPositionRequestData';
import { GetEnemyPositionUseCases } from '../useCases/GetEnemyPositionUseCase';
import DataProcessor from '../utils/DataProcessor';

export default class RadarFacade implements GetEnemyPositionUseCases {
  private dataProcessor: DataProcessor;
  public constructor() {
    this.dataProcessor = new DataProcessor();
  }

  public getEnemyPosition(data: GetEnemyPositionRequestData): Coordinates {
    console.log(
      `Calculating enemy coordinates with info: ${JSON.stringify(
        data,
        null,
        2
      )}`
    );
    const protocols = data.protocols;
    const scans = data.scan;

    const targetScan = this.dataProcessor.processData(protocols, scans);
    console.log(
      `Calculated enemy position: ${JSON.stringify(targetScan, null, 2)}`
    );
    return {
      x: targetScan.coordinates.x,
      y: targetScan.coordinates.y,
    };
  }
}
