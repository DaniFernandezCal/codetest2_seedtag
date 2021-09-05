import { Coordinates } from '../models/Coordinates';
import { Protocol } from '../models/Protocols';
import { Scan } from '../models/Scan';

type RestrictProtocol = 'avoid-mech' | 'avoid-crossfire';
type SortingProtocol = 'closest-enemies' | 'furthest-enemies';
type PrioritizeProtocol = 'assist-allies' | 'prioritize-mech';

export default class DataProcessor {
  public constructor() {}

  public processData(protocols: Protocol[], scans: Scan[]): Scan {
    if (protocols.includes('avoid-crossfire')) {
      scans = this.applyRestrictsFiltering(scans, 'avoid-crossfire');
    }
    if (protocols.includes('avoid-mech')) {
      scans = this.applyRestrictsFiltering(scans, 'avoid-mech');
    }
    if (protocols.includes('closest-enemies')) {
      scans = this.sortScansByDistance(scans, 'closest-enemies');
    }
    if (protocols.includes('furthest-enemies')) {
      scans = this.sortScansByDistance(scans, 'furthest-enemies');
    }
    if (protocols.includes('assist-allies')) {
      return this.getPrioritizeScan(scans, 'assist-allies');
    }
    if (protocols.includes('prioritize-mech')) {
      return this.getPrioritizeScan(scans, 'prioritize-mech');
    }
    const scanToReturn = scans.find(
      (scan) => this.getDistance(scan.coordinates) < 100
    );
    if (!scanToReturn) {
      throw new Error('Not found any possible match');
    }
    return scanToReturn;
  }

  public applyRestrictsFiltering(
    scans: Scan[],
    protocol: RestrictProtocol
  ): Scan[] {
    if (protocol === 'avoid-crossfire') {
      return this.applyAvoidCrossfire(scans);
    }
    if (protocol === 'avoid-mech') {
      return this.applyAvoidMech(scans);
    }
    return scans;
  }

  public sortScansByDistance(scans: Scan[], protocol: SortingProtocol): Scan[] {
    if (protocol === 'closest-enemies') {
      return this.sortByClosest(scans);
    }
    if (protocol === 'furthest-enemies') {
      return this.sortByFurthest(scans);
    }
    return scans;
  }

  public getPrioritizeScan(scans: Scan[], protocol: PrioritizeProtocol): Scan {
    if (protocol === 'assist-allies') {
      const firstScanWithAlly = this.getFirstScanWithAllies(scans);
      if (!firstScanWithAlly) {
        throw new Error('Not found any Scan that matched given protocol');
      }
      return firstScanWithAlly;
    }
    if (protocol === 'prioritize-mech') {
      const firstScanWithMechs = this.getFirstScanWithMechs(scans);
      if (!firstScanWithMechs) {
        throw new Error('Not found any Scan that matched given protocol');
      }
      return firstScanWithMechs;
    }
    return scans[0];
  }

  private applyAvoidCrossfire(scans: Scan[]): Scan[] {
    return scans.filter((scan) => !scan.allies);
  }
  private applyAvoidMech(scans: Scan[]): Scan[] {
    return scans.filter((scan) => scan.enemies.type !== 'mech');
  }

  private sortByClosest(scans: Scan[]): Scan[] {
    const sortedList = scans.sort((a, b) =>
      this.getDistance(a.coordinates) > this.getDistance(b.coordinates) ? 1 : -1
    );
    return sortedList;
  }

  private sortByFurthest(scans: Scan[]): Scan[] {
    const sortedList = scans.sort((a, b) =>
      this.getDistance(a.coordinates) > this.getDistance(b.coordinates) ? -1 : 1
    );
    return sortedList;
  }

  private getFirstScanWithAllies(scans: Scan[]): Scan | undefined {
    return scans.find((scan) => scan.allies);
  }

  private getFirstScanWithMechs(scans: Scan[]): Scan | undefined {
    return scans.find((scan) => scan.enemies.type === 'mech');
  }

  public getDistance(coordinates: Coordinates): number {
    return Math.sqrt(Math.pow(coordinates.x, 2) + Math.pow(coordinates.y, 2));
  }
}
