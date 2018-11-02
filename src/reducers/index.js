import * as actions from '../constants';
import WaitTimes from '../services/WaitTimes.js';

const calculateStats = (list) => {
  return list.reduce((memo, item) => {
    memo.peopleServed += item.partySize;
    return memo;
  }, {
    peopleServed: 0,
    groupsServed: 0,
    waiting: list.length
  });
}

const waitlist = (state, action) => {
  switch(action.type) {
    case actions.DELETE_WAITLIST_GUEST: {
        const list = state.list.filter(item => item !== action.item);
        const waits = new WaitTimes({
          list,
          waitTimes: state.waitTimes
        });
        const waitTimes = waits.calculate();
        return {...state, list, waitTimes };
    }

    case actions.REMEMBER_WAITLIST_VISIT:
      return {...state, customer: action.item};


    case actions.UPDATE_WAITLIST_VISIT: {
      const list = state.list.map((visit, index) => {
        return (visit.id === action.customer.id ? action.customer : visit);
      });
      const waits = new WaitTimes({
        list,
        waitTimes: state.waitTimes
      });
      const waitTimes = waits.calculate();

      const availableTags = state.tags.reduce((map, tag) => {
        map[tag] = 1;
        return map;
      }, {});
      const tagsUsed = {...state.tagsUsed};
      const tags = [...state.tags];
      action.customer.tags.forEach(tag => {
        if(!availableTags[tag]) {
          tags.unshift(tag);
        }
        tagsUsed[tag] = (tagsUsed[tag] || 0) + 1;
      });

      return {...state, list, tagsUsed, tags, waitTimes};
    }

    case actions.CREATE_WAITLIST_VISIT: {
      const customer = {
        id: Date.now(),
        createdAt: Date.now(),
        ...action.customer
      };
      const list = [...state.list, customer];
      return {...state, list};
    }

    default:
      return state;
  }
}


export default waitlist;