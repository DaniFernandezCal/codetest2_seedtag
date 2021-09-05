import { Express } from 'express';
import express from 'express';
import RadarFacade from '../facades/RadarFacade';

export default class RadarApi {
  static API_PATH = '/radar';
  private app: Express;
  private port: Number;
  private facade: RadarFacade;
  public constructor(port: number, facade: RadarFacade) {
    this.app = express();
    this.port = port;
    this.facade = facade;
  }

  public async init(): Promise<void> {
    this.app.use(express.json());
    this.app.post(RadarApi.API_PATH, (req, res) => {
      console.log(`Received POST request to calculate enemy position`);
      const coordenates = this.facade.getEnemyPosition(req.body);
      res.send(coordenates);
    });
    this.app.listen(this.port, () => {
      console.log(`Radar server started at http://localhost:${this.port}`);
    });
  }
}
