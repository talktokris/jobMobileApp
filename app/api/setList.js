import client from "./client";

const country = () => client.get("/country");
const education = () => client.get("/education");
const experience = () => client.get("/experience");
const skill = () => client.get("/skill");
const language = () => client.get("/language");
const skillLevel = () => client.get("/skill/level");
const languageLevel = () => client.get("/language/level");

export default {
  country,
  education,
  experience,
  skill,
  language,
  skillLevel,
  languageLevel,
};
