import client from "./client";

const login = (email, password) => client.post("/login", { email, password });

//const profile = () => client.post("/profile", {});

export default {
  login: login,
  //profile:profile
};
