import RadarApi from './api/RadarApi';
import RadarFacade from './facades/RadarFacade';

export default class radarService {
  private radarApi: RadarApi;
  private facade: RadarFacade;
  public constructor(port: number) {
    this.facade = new RadarFacade();
    this.radarApi = new RadarApi(port, this.facade);
  }

  public async init(): Promise<void> {
    await this.radarApi.init();
  }
}
