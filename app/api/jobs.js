import client from "./client";

const endpoint = "/jobs/list";

const getJobListings = () => client.get(endpoint);

const getJobDetails = () => client.get("jobs/1".id);

const getJobFavList = (id) => client.get("jobs/fav/".id);

const getJobSearchReults = async (search) => {
  //client.get("jobs/search/kris");
  const result = await client.get("jobs/search/" + search);
  return result;

  // console.log(search);
};

export default {
  getJobListings,
  getJobDetails,
  getJobFavList,
  getJobSearchReults,
};
