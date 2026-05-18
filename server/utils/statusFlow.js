const TRANSITIONS = {
  'Pending':    ['Picked Up', 'Cancelled'],
  'Picked Up':  ['In Transit', 'Cancelled'],
  'In Transit': ['Delivered', 'Cancelled'],
  'Delivered':  [],
  'Cancelled':  [],
};

export const isValidTransition = (from, to) => {
  const allowed = TRANSITIONS[from];
  if (!allowed) return false;
  return allowed.includes(to);
};

export const getAllowedTransitions = (from) => {
  return TRANSITIONS[from] || [];
};