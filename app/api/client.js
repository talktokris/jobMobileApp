import { create } from "apisauce";
import authStorage from "../auth/storage";


const apiClient = create({
  baseURL: "http://192.168.254.4:9000/api",
  //baseURL: "http://192.168.1.68:9000/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();

  if (!authToken) return;

  request.headers["x-auth-token"] = authToken;
});

export default apiClient; 
