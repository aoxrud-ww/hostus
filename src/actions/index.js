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
  type: action.EDIT_WAITLIST_GUEST,
  item
});