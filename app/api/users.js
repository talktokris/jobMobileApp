import client from "./client";

const register = (userInfo) => client.post("/users", userInfo);

const getRefreshToken = async () => {
  const result = await client.get("/refresh");
  return result;
};

const getUserInfo = async () => {
  const result = await client.post("/profile");
  console.log(result);
  if (!result.ok) return;
  return result.data;
};

export default { register, getRefreshToken, getUserInfo };
