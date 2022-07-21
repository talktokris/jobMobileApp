import client from "./client";

const skillCreate = async (userInfo, currrentUser) => {
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("skillName", userInfo.skillName);
  data.append("skill_level", userInfo.skill_level.title);
  // console.log(data);
  const result = await client.post("/skill/create", data);
  return result;
};
const skillUpdate = (userInfo) => client.post("/users", userInfo);
const skillDelete = (id) => client.delete("/skill/delete/" + id);

export default { skillCreate, skillUpdate, skillDelete };
