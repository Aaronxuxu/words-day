import { OPEN, CLOSE } from "../../uitil/constans";

function formModal(prev = false, action) {
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
export default formModal;
