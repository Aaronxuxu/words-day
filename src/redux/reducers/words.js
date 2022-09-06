import { GETWORD } from "../../uitil/constans";

function WORDS(prev = {}, actions) {
  const { type, data } = actions;
  switch (type) {
    case GETWORD:
      return data;
    default:
      return prev;
  }
}

export default WORDS;
