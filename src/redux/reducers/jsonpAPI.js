import { GETAREA } from "../../uitil/constans";

const init = {
  area: null,
};
function jsonAPI(prev = init, actions) {
  const { type, data } = actions;

  switch (type) {
    case GETAREA:
      return { ...prev, area: data };
    default: {
      return prev;
    }
  }
}
export default jsonAPI;
