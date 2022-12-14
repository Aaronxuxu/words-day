import { CLOSE, OPEN } from "../../uitil/constans";

function loginModal(prev = false, action) {
  const { type, data } = action;

  switch (type) {
    case OPEN:
      return data;
    case CLOSE:
      return data;
    default:
      return prev;
  }
}

export default loginModal;
