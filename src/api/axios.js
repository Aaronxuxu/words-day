import ajax from "./ajax";
import { GET, POST } from "../uitil/constans";
export const addWord = (data) => ajax("/api/jc/add", POST, data);

export const getWords = (data) => ajax("/api/jc/get", GET, data);
