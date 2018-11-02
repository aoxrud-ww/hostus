import * as action from '../constants';

export const deleteWailistCustomer = (item) => ({
  type: action.DELETE_WAITLIST_GUEST,
  item
});
export const notifyWaitlistCustomer = (item) => ({
  type: action.NOTIFY_WAITLIST_GUEST,
  item
});
export const editWaitlistCustomer = (item) => ({
  type: action.REMEMBER_WAITLIST_VISIT,
  item
});



export const addCustomer = customer => ({
  type: action.ADD_WAITLIST_GUEST,
  customer
});


export const updateWaitlistVisit = customer => ({
  type: action.UPDATE_WAITLIST_VISIT,
  customer
});

export const createWaitlistVisit = customer => ({
  type: action.CREATE_WAITLIST_VISIT,
  customer
});
