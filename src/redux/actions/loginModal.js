import { OPEN, CLOSE } from "../../uitil/constans";

export const openLoginModalAction = () => ({ type: OPEN, data: true });
export const closeLoginMadlAction = () => ({ type: CLOSE, data: false });
