export default class Tags {

  constructor({state, customer}) {
    this.tags = state.tags;
    this.tagsUsed = state.tagsUsed;
    this.customerTags = customer.tags;
  }

  calculate() {
    const availableTags = this.tags.reduce((map, tag) => {
      map[tag] = 1;
      return map;
    }, {});
    const tagsUsed = {...this.tagsUsed};
    const tags = [...this.tags];
    this.customerTags.forEach(tag => {
      if(!availableTags[tag]) {
        tags.unshift(tag);
      }
      tagsUsed[tag] = (tagsUsed[tag] || 0) + 1;
    });

    return {tagsUsed, tags};
  }
}