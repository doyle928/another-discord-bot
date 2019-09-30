import _ from "lodash";

import { FETCH_SERVERS, FETCH_SERVER } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_SERVERS:
      return { ...state, servers: action.payload };
    case FETCH_SERVER:
      return { ...state, counts: action.payload };
    default:
      return state;
  }
};
