import * as c from './../actions/ActionTypes';

export const deleteMemory = id => ({
  type: c.DELETE_MEMORY,
  id
})

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});