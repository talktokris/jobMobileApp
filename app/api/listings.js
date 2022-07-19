import client from "./client";

const endpoint = "/jobs/list/";

const getJobListings = () => client.get(endpoint);

const getJobDetails = ($id) => client.get("jobs/".$id);

const getJobFavList = ($id) => client.get("jobs/fav/".$id);

const getJobSearchReults = ($word) => client.post("jobs/search/".$word);

export default {
  getJobListings,
  getJobDetails,
  getJobFavList,
  getJobSearchReults,
};
