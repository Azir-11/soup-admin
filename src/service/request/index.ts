import { createRequest } from "./request";

const url = "http://localhost:5200/";

export const request = createRequest({ baseURL: url });

export const mockRequest = createRequest({ baseURL: "/mock" });
