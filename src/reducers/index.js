import * as actions from '../constants';

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
        return {...state, list };
    }

    case actions.REMEMBER_WAITLIST_VISIT:
      return {...state, customer: action.item};


    case actions.UPDATE_WAITLIST_VISIT: {
      const list = state.list.map((visit, index) => {
        return (visit.id === action.customer.id ? action.customer : visit);
      });
      return {...state, list};
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