import { expect } from 'chai';
import { Scan } from '../../../src/radar/models/Scan';
import DataProcessor from '../../../src/radar/utils/DataProcessor';
import { ScanBuilder } from '../../builders/ScanBuilder';

describe.only('tests/unit/DataProcessor test cases', () => {
  let dataProcessor: DataProcessor;
  before(() => {
    dataProcessor = new DataProcessor();
  });
  describe('restrics cases', () => {
    it('using avoid-crossfire protocol should remove all elements than contains any number of allies', () => {
      const scans = [
        new ScanBuilder().withMechEnemy().withAlly(2).build(),
        new ScanBuilder().withMechEnemy().withAlly(2).build(),
        new ScanBuilder().withSoldierEnemy().build(),
      ];
      const scansFiltered = dataProcessor.applyRestrictsFiltering(
        scans,
        'avoid-crossfire'
      );
      expect(scansFiltered.length).to.be.equal(1);
      expect(
        scansFiltered.map((scan: Scan) => {
          expect(scan.allies).to.be.undefined;
        })
      );
    });
    it('using avoid-mech protocol should remove all elements than contains any number of allies', () => {
      const scans = [
        new ScanBuilder().withMechEnemy().withAlly(2).build(),
        new ScanBuilder().withMechEnemy().withAlly(2).build(),
        new ScanBuilder().withSoldierEnemy().build(),
      ];
      const scansFiltered = dataProcessor.applyRestrictsFiltering(
        scans,
        'avoid-mech'
      );
      expect(
        scansFiltered.map((scan: Scan) => {
          expect(scan.enemies.type).to.be.equal('soldier');
        })
      );
    });
  });

  describe('prioritize position cases', () => {
    let scans: Scan[];
    before(() => {
      scans = [
        new ScanBuilder().withRandomAttrs().build(),
        new ScanBuilder().withRandomAttrs().build(),
        new ScanBuilder().withRandomAttrs().build(),
        new ScanBuilder().withRandomAttrs().build(),
      ];
    });

    it('using closest-enemies protocol should return the scans sorted by distance, from closest to further', () => {
      const scansSorted = dataProcessor.sortScansByDistance(
        scans,
        'closest-enemies'
      );

      const isSorted = scansSorted.every(
        (v, i, a) =>
          !i ||
          dataProcessor.getDistance(a[i - 1].coordinates) <=
            dataProcessor.getDistance(v.coordinates)
      );
      expect(isSorted).to.be.true;
    });

    it('using furthest-enemies protocol should return the scans sorted by distance, from further to closest', () => {
      const scansSorted = dataProcessor.sortScansByDistance(
        scans,
        'furthest-enemies'
      );

      const isSorted = scansSorted.every(
        (v, i, a) =>
          !i ||
          dataProcessor.getDistance(a[i - 1].coordinates) >=
            dataProcessor.getDistance(v.coordinates)
      );
      expect(isSorted).to.be.true;
    });
  });

  describe('prioritize types cases', () => {
    it('using asssist-allies should return the first scan with allies', () => {
      const scans = [
        new ScanBuilder().withRandomEnemy().build(),
        new ScanBuilder().withRandomEnemy().build(),
        new ScanBuilder().withAlly(2).withRandomEnemy().build(),
        new ScanBuilder().withAlly(2).withRandomEnemy().build(),
      ];

      const scanWithAllies = dataProcessor.getPrioritizeScan(
        scans,
        'assist-allies'
      );
      expect(scanWithAllies).to.be.equal(scans[2]);
    });

    it('using prioritize-mech should return a scan with a mech enemy', () => {
      const scans = [
        new ScanBuilder().withSoldierEnemy().build(),
        new ScanBuilder().withMechEnemy().build(),
        new ScanBuilder().withSoldierEnemy().build(),
        new ScanBuilder().withMechEnemy().build(),
      ];

      const scanWithMech = dataProcessor.getPrioritizeScan(
        scans,
        'prioritize-mech'
      );
      expect(scanWithMech).to.be.equal(scans[1]);
    });
  });
});
