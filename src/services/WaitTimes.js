class WaitTimes {
  constructor({waitTimes, list}) {
    this.waitTimes = waitTimes;
    this.list = list;
  }

  getWaitsPerPartySize() {
    return this.list.reduce((waits, guest) => {
      if(!waits[guest.partySize]) {
        waits[guest.partySize] = [];
      }
      waits[guest.partySize].push(Date.now() - guest.createdAt);
      return waits;
    }, {});
  }

  combineWaits(waitsPerSize) {
    return this.waitTimes.map(group => {
      let groupWaits = [];

      if(group.min && group.max) {
        for(let size = group.min; size <= group.max; size++) {
          if(waitsPerSize[size]) {
            groupWaits = groupWaits.concat(waitsPerSize[size]);
          }
        }
      } else if(group.min) {
        Object.keys(waitsPerSize)
          .filter(size => size >= group.min)
          .forEach(groupSize => {
            groupWaits = groupWaits.concat(waitsPerSize[groupSize]);
          });
      }

      group.value = this.calculateAverage(groupWaits);
      return group;
    });
  }

  calculateAverage(waits) {
    if(!waits.length) {
      return 0;
    }
    return Math.round((waits.reduce((a,b) => a+b, 0) / waits.length) / 60000);
  }

  calculate() {
    const waitsPerSize = this.getWaitsPerPartySize();
    const groupWaits = this.combineWaits(waitsPerSize);
    return groupWaits;
  }
}

export default WaitTimes;