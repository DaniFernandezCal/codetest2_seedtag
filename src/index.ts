import RadarService from './radar/RadarService';

const RADAR_PORT = 8888;
async function startService() {
  const radarService = new RadarService(RADAR_PORT);
  await radarService.init();
}

startService();
