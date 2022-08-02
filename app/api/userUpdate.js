import client from "./client";

//=============== Month String to Number===================
function dateStingToNumber(month) {
  var day = 0;
  if (month == "January") {
    day = 1;
  } else if (month == "February") {
    day = 2;
  } else if (month == "March") {
    day = 3;
  } else if (month == "April") {
    day = 4;
  } else if (month == "May") {
    day = 5;
  } else if (month == "June") {
    day = 6;
  } else if (month == "July") {
    day = 7;
  } else if (month == "August") {
    day = 8;
  } else if (month == "September") {
    day = 9;
  } else if (month == "October") {
    day = 10;
  } else if (month == "November") {
    day = 11;
  } else if (month == "December") {
    day = 12;
  } else {
    day = 0;
  }

  return day;
}

//=============== Month Number to String===================

function dateNumberToString(monthSt) {
  var month = "";
  if (monthSt == 1) {
    month = "January";
  } else if (monthSt == 2) {
    month = "February";
  } else if (monthSt == 3) {
    month = "March";
  } else if (monthSt == 4) {
    month = "April";
  } else if (monthSt == 5) {
    month = "May";
  } else if (monthSt == 6) {
    month = "June";
  } else if (monthSt == 7) {
    month = "July";
  } else if (monthSt == 8) {
    month = "August";
  } else if (monthSt == 9) {
    month = "September";
  } else if (monthSt == 10) {
    month = "October";
  } else if (monthSt == 11) {
    month = "November";
  } else if (monthSt == 12) {
    month = "December";
  } else {
    month = "";
  }

  return month;
}

//=============== Skill CRUD API ===================
const skillCreate = async (userInfo, currrentUser) => {
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("skillName", userInfo.skillName);
  data.append("skill_level", userInfo.skill_level.title);
  // console.log(data);
  const result = await client.post("/skill/create", data);
  return result;
};

const skillDelete = (id) => client.delete("/skill/delete/" + id);
const data = new FormData();
const skillUpdate = async (userInfo, currrentUser, skillId) => {
  data.append("user_id", currrentUser);
  data.append("skillName", userInfo.skillName);
  data.append("skill_level", userInfo.skill_level);
  // console.log(data);
  const result = await client.post("/skill/update/" + skillId, data);
  return result;
};
//=============== Language CRUD API ===================

const languageCreate = async (userInfo, currrentUser) => {
  const data = new FormData();
  // console.log(userInfo);
  data.append("user_id", currrentUser);
  data.append("language_name", userInfo.language_name.title);
  data.append("language_level", userInfo.language_level.title);

  const result = await client.post("/language/create", data);
  return result;
};
const languageDelete = (id) => client.delete("/language/delete/" + id);

const languageUpdate = async (userInfo, currrentUser, languageId) => {
  //console.log(userInfo);
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("language_name", userInfo.language_name);
  data.append("language_level", userInfo.language_level);
  //console.log(data);
  const result = await client.post("/language/update/" + languageId, data);

  return result;
};

//=============== Training CRUD API ===================

const trainingCreate = async (userInfo, currrentUser) => {
  const data = new FormData();
  // console.log(userInfo);
  data.append("user_id", currrentUser);
  data.append("name", userInfo.name);
  data.append("org", userInfo.org);
  data.append("country", userInfo.country.title);
  data.append(
    "startDate",
    userInfo.fromMonth.title.trim() + " - " + userInfo.fromYear.trim()
  );
  data.append(
    "endDate",
    userInfo.toMonth.title.trim() + " - " + userInfo.toYear.trim()
  );
  const result = await client.post("/training/create", data);
  //console.log(result);
  return result;
};
const trainingDelete = (id) => client.delete("/training/delete/" + id);

const trainingUpdate = async (userInfo, currrentUser, trainingId) => {
  // console.log(userInfo);
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("name", userInfo.name);
  data.append("org", userInfo.org);
  data.append("country", userInfo.country);
  data.append(
    "startDate",
    userInfo.fromMonth.trim() + " - " + userInfo.fromYear.trim()
  );
  data.append(
    "endDate",
    userInfo.toMonth.trim() + " - " + userInfo.toYear.trim()
  ); //console.log(data);
  const result = await client.post("/training/update/" + trainingId, data);

  return result;
};

//=============== Education CRUD API ===================

const educationCreate = async (userInfo, currrentUser) => {
  const data = new FormData();
  // console.log(userInfo);
  data.append("user_id", currrentUser);
  data.append("level", userInfo.level.title);
  data.append("school", userInfo.school);
  data.append("country", userInfo.country.title);
  data.append("subject", userInfo.subject);
  data.append(
    "startDate",
    userInfo.fromMonth.title.trim() + " - " + userInfo.fromYear.trim()
  );
  data.append(
    "endDate",
    userInfo.toMonth.title.trim() + " - " + userInfo.toYear.trim()
  );
  const result = await client.post("/education/create", data);
  //console.log(result);
  return result;
};
const educationDelete = (id) => client.delete("/education/delete/" + id);

const educationUpdate = async (userInfo, currrentUser, educationId) => {
  // console.log(userInfo);
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("level", userInfo.level);
  data.append("school", userInfo.school);
  data.append("country", userInfo.country);
  data.append("subject", userInfo.subject);
  data.append(
    "startDate",
    userInfo.fromMonth.trim() + " - " + userInfo.fromYear.trim()
  );
  data.append(
    "endDate",
    userInfo.toMonth.trim() + " - " + userInfo.toYear.trim()
  ); //console.log(data);
  const result = await client.post("/education/update/" + educationId, data);

  return result;
};

//=============== Experience CRUD API ===================

const experienceCreate = async (userInfo, currrentUser) => {
  const data = new FormData();
  // console.log(userInfo);
  data.append("user_id", currrentUser);
  data.append("post", userInfo.post);
  data.append("company", userInfo.company);
  data.append("country", userInfo.country.title);
  data.append(
    "startDate",
    userInfo.fromMonth.title.trim() + " - " + userInfo.fromYear.trim()
  );
  data.append(
    "endDate",
    userInfo.toMonth.title.trim() + " - " + userInfo.toYear.trim()
  );
  const result = await client.post("/experience/create", data);
  //console.log(result);
  return result;
};
const experienceDelete = (id) => client.delete("/experience/delete/" + id);

const experienceUpdate = async (userInfo, currrentUser, experienceId) => {
  // console.log(userInfo);
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("post", userInfo.post);
  data.append("company", userInfo.company);
  data.append("country", userInfo.country);
  data.append(
    "startDate",
    userInfo.fromMonth.trim() + " - " + userInfo.fromYear.trim()
  );
  data.append(
    "endDate",
    userInfo.toMonth.trim() + " - " + userInfo.toYear.trim()
  );
  //console.log(data);
  const result = await client.post("/experience/update/" + experienceId, data);

  return result;
};

//=============== JobPreferences CRUD API ===================

const jobPreferenceCreate = async (userInfo, currrentUser) => {
  const data = new FormData();
  // console.log(userInfo);
  data.append("user_id", currrentUser);
  data.append("industry", userInfo.industry);
  data.append("function", userInfo.function);
  data.append("country", userInfo.country.title);
  data.append("city", userInfo.city);
  data.append("type", userInfo.type.title);

  const result = await client.post("/job-preference/create", data);
  //console.log(result);
  return result;
};
const jobPreferenceDelete = (id) =>
  client.delete("/job-preference/delete/" + id);

const jobPreferenceUpdate = async (userInfo, currrentUser, jobPreferenceId) => {
  // console.log(userInfo);
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("industry", userInfo.industry);
  data.append("function", userInfo.function);
  data.append("country", userInfo.country.title);
  data.append("city", userInfo.city.title);
  data.append("type", userInfo.type.title);
  //console.log(data);
  const result = await client.post(
    "/job-preference/update/" + jobPreferenceId,
    data
  );
  return result;
};

//=============== Resume Basic and Personal Update API ===================

const userBasicUpdate = async (userInfo, currrentUser, jobPreferenceId) => {
  //console.log(userInfo);
  const data = new FormData();
  data.append("name", userInfo.name);
  data.append("profile_type", userInfo.profile_type);
  data.append("sex", userInfo.sex);

  const monthNumber = dateStingToNumber(userInfo.month);

  data.append(
    "dob",
    userInfo.year.trim() + "-" + monthNumber + "-" + userInfo.day
  );
  data.append("mobileNo", userInfo.mobileNo);

  const result = await client.post("/basic/update/" + jobPreferenceId, data);
  //console.log(result);
  return result;
};

const userPersonalUpdate = async (userInfo, currrentUser, jobPreferenceId) => {
  //console.log(userInfo);
  const data = new FormData();
  data.append("nationality", userInfo.nationality);
  data.append("countryLiveIn", userInfo.countryLiveIn);
  data.append("maritalStatus", userInfo.maritalStatus);
  data.append("religion", userInfo.religion);
  data.append("weight", userInfo.weight);
  data.append("height", userInfo.feet.trim() + " - " + userInfo.inches.trim());
  // console.log(data);
  const result = await client.post("/personal/update/" + jobPreferenceId, data);

  return result;
};

//=============== favorite Jobs Update API ===================

const favoriteJobsCreate = async (currrentUser, jobId) => {
  //console.log(userInfo);
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("job_ads_id", jobId);

  const result = await client.post("/favorite-jobs/create", data);
  //console.log(result);
  return result;
};

const favoriteJobsDelete = async (id) => {
  // console.log(id);
  const result = await client.delete("favorite-jobs/delete/" + id);
  // console.log(result);
  return result;
};

//=============== Apply Jobs  API ===================

const applyJobCreate = async (currrentUser, jobId) => {
  //console.log(userInfo);
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("job_ads_id", jobId);

  const result = await client.post("/jobs/apply", data);
  // console.log(result);
  return result;
};

//=============== jobSingleFatch Jobs  API ===================

const jobSingleFatch = async (id) => {
  // console.log("hi"+id);
  const result = await client.get("/jobs/" + id);
  //console.log(result);
  return result;
};

//=============== Fab Jobs List  API ===================

const jobFabFatch = async (id) => {
  // console.log("hi"+id);
  const result = await client.get("jobs/fav/" + id);
  //console.log(result);
  return result;
};

//=============== Fab Jobs List  API ===================

const jobAppliedFatch = async (id) => {
  // console.log("hi"+id);
  const result = await client.get("jobs/applied/" + id);
  //console.log(result);
  return result;
};

//=============== Message List  API ===================

const messageFatch = async (id) => {
  // console.log("hi"+id);
  const result = await client.get("push/message/" + id);
  //console.log(result);
  return result;
};


//=============== Image Upload ===================

const imagesUpload = async (userInfo, currrentUser) => {
  console.log(userInfo.images[0].uri);
 
  /*
  const data = new FormData();
  data.append("user_id", currrentUser);
  data.append("image", userInfo.language_name);
  data.append("language_level", userInfo.language_level);
  //console.log(data);
  const result = await client.post("/language/update/" + languageId, data);

  return result;
  */
};

export default {
  skillCreate,
  skillUpdate,
  skillDelete,
  languageCreate,
  languageUpdate,
  languageDelete,
  trainingCreate,
  trainingUpdate,
  trainingDelete,
  educationCreate,
  educationUpdate,
  educationDelete,
  experienceCreate,
  experienceUpdate,
  experienceDelete,
  jobPreferenceCreate,
  jobPreferenceUpdate,
  jobPreferenceDelete,
  userBasicUpdate,
  userPersonalUpdate,
  favoriteJobsCreate,
  favoriteJobsDelete,
  applyJobCreate,
  jobAppliedFatch,
  jobSingleFatch,
  jobFabFatch,
  messageFatch,
  dateStingToNumber,
  dateNumberToString,
  imagesUpload,
};

