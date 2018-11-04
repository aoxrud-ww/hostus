import * as actions from '../constants';
import WaitTimes from '../services/WaitTimes.js';
import Tags from '../services/Tags.js';


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

      const waitTimes = (new WaitTimes({
        list,
        waitTimes: state.waitTimes
      })).calculate();

      const {tagsUsed, tags} = (new Tags({state, customer: action.customer})).calculate();

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