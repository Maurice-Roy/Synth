const defaultState = {
  currentPatchState: {},
  allPatches: [],
  oscList: {}
}

export default function synthReducer (state = defaultState, action) {
  switch (action.type) {
    case 'UPDATE_PATCH':
      //return the updated state here
      console.log('UPDATE_PATCH: ', action.payload);
      return state
      break;
    case 'FETCH_PATCHES':
      //update the state to contain the fetched patches
      console.log('FETCH_PATCHES: ', action.payload);
      return {
        ...state,
        allPatches: action.payload
      }
      break;
    default:
      return state
      break;
  }
}
