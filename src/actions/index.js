import servers from "../apis/servers";
import history from "../history";
import { FETCH_SERVERS, FETCH_SERVER } from "./types";
import axios from "axios";

export const fetchServers = () => async dispatch => {
  let res = await axios.post(
    "https://lulu-discord-bot.herokuapp.com/api",
    {
      query: `query {
      getServers {
        guild_id
      }
    }`
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  dispatch({ type: FETCH_SERVERS, payload: res.data.data.getServers });
};

export const fetchServer = id => async dispatch => {
  let res = await axios.post(
    "https://lulu-discord-bot.herokuapp.com/api",
    {
      query: `{
            getCount(guild_id: "${id}") {
              members timestamp
            }
          }`
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  dispatch({ type: FETCH_SERVER, payload: res.data.data.getCount });
};
