export default (state = {}, action) =>{
  switch (action.type) {
    case "GET_STUDENT_DATA":
      return {
        ...state,
        address : action.payload,
        message : action.message
      }
    default:
      return state
  }
}
