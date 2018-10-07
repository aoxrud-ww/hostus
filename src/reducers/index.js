import * as actions from '../constants';

const waitlist = (state, action) => {
  console.log('waitlist reducer', state, action);

  switch(action.type) {
    case actions.DELETE_WAITLIST_GUEST: {
        const list = state.list.filter(item => item !== action.item);
        return {...state, list };
    }

    case actions.NOTIFY_WAITLIST_GUEST: {
        const list = [...state.list];
        action.item.id = Date.now();
        list[0].list.push(action.item);
        return {...state, list};
    }

    case actions.EDIT_WAITLIST_GUEST:
      return {...state, customer: action.item};

    default:
      return state;
  }
}


export default waitlist;