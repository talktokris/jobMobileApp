import client from "./client";


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
const skillUpdate = async (userInfo, currrentUser, skillId) => {
  data.append("user_id", currrentUser);
  data.append("skillName", userInfo.skillName);
  data.append("skill_level", userInfo.skill_level.title);
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
  data.append("language_name", userInfo.language_name.title);
  data.append("language_level", userInfo.language_level.title);
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
  data.append("country", userInfo.country.title);
  data.append(
    "startDate",
    userInfo.fromMonth.title.trim() + " - " + userInfo.fromYear.trim()
  );
  data.append(
    "endDate",
    userInfo.toMonth.title.trim() + " - " + userInfo.toYear.trim()
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
  data.append("country", userInfo.country.title);
  data.append(
    "startDate",
    userInfo.fromMonth.title.trim() + " - " + userInfo.fromYear.trim()
  );
  data.append(
    "endDate",
    userInfo.toMonth.title.trim() + " - " + userInfo.toYear.trim()
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
  data.append("firstName", userInfo.firstName);
  data.append("middleName", userInfo.middleName);
  data.append("lastName", userInfo.lastName);
  data.append("profile_type", userInfo.profile_type.title);
  data.append("sex", userInfo.sex.title);
  data.append(
    "dob",
    userInfo.year.trim() + "-" + userInfo.month.id + "-" + userInfo.day.id
  );
  data.append("mobileNo", userInfo.mobileNo);

  const result = await client.post("/basic/update/" + jobPreferenceId, data);
  //console.log(result);
  return result;
};

const userPersonalUpdate = async (userInfo, currrentUser, jobPreferenceId) => {
  //console.log(userInfo);
  const data = new FormData();
  data.append("nationality", userInfo.nationality.title);
  data.append("countryLiveIn", userInfo.countryLiveIn.title);
  data.append("maritalStatus", userInfo.maritalStatus.title);
  data.append("religion", userInfo.religion.title);
  data.append("weight", userInfo.weight);
  data.append(
    "height",
    userInfo.feet.title.trim() + " - " + userInfo.inches.title.trim()
  );
  // console.log(data);
  const result = await client.post("/personal/update/" + jobPreferenceId, data);

  return result;
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
};

