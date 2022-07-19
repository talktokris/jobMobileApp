import client from "./client";

//const endpoint = "/jobs/list";

//const getJobListings = () => client.get(endpoint);

//const getJobDetails = () => client.get("jobs/1".id);

//const getJobFavList = (id) => client.get("jobs/fav/".id);
const getResumeDataSingle = (currrentUser) =>
  client.post("/resume", { id: currrentUser });

const getResumeData = async (currrentUser) => {
  //client.get("jobs/search/kris");
  console.log(currrentUser);
  //const result = await client.get("/resume/" + currrentUser);

  const result = await client.post("/resume", { id: currrentUser });

  // console.log(result);
  return result;
};

export default {
  getResumeData,
  getResumeDataSingle,
};
