import { OPEN, CLOSE } from "../../uitil/constans";

export const closeModal = () => ({ type: CLOSE, data: false });
export const openModal = () => ({ type: OPEN, data: true });
