import React, { useCallback, useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ScrollView, Text } from "react-native";
import ProfileBasic from "../components/ProfileBasic";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

import Separater from "../components/Separater";
import ResumeHeading from "../components/ResumeHeading";
import ResumeInnerView from "../components/ResumeInnerView";
import routes from "../navigation/routes";
import resume from "../api/resume";
import settings from "../config/setting";
import ActivityIndicator from "../components/ActivityIndicator";

/*
const users.data[0] = {
  id: 1,
  basicInfo: {
    firstName: "Krishna",
    middleName: "Kumar",
    lastName: "Jha",
    sex: "Male",
    dob: "1984 Aug 23",
    hight: "5 feet 8 inches",
    weight: "75 KG",
    nationality: "Nepalese",
    email: "freshkris@gmail.com",
    emailStatus: "Verified",
    mobileNo: "+9779819857575",
    mobileStatus: "Not Verified",
    counryliveIn: "Malaysia",
    users.data[0]Type: "Professional",
    users.data[0]Title: "IT Professional",
    image: require("../assets/images/av.jpg"),
  },
  get_skill: [
    {
      id: "1",
      skillName: "PHP",
      skillType: "Advance",
    },
    {
      id: "2",
      skillName: "Laravel",
      skillType: "Expert",
    },
    {
      id: "3",
      skillName: "MYSQL",
      skillType: "Expert",
    },
    ,
    {
      id: "4",
      skillName: "Work Press",
      skillType: "Expert",
    },
  ],
  jobPreferences: [
    {
      id: "1",
      industry: "Information Technology",
      function: "Software Developer",
      country: "Malaysia",
      city: "Kuala Lumpur",
      type: "Full Time",
    },
  ],

  experiences: [
    {
      id: "1",
      post: "Software Developer",
      company: "ePlanet Net Sdn Bsd",
      country: "Nepal",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
    {
      id: "2",
      post: "Software Developer",
      company: "ePlanet Net Sdn Bsd",
      country: "Nepal",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
    {
      id: "3",
      post: "Software Developer",
      company: "ePlanet Net Sdn Bsd",
      country: "Nepal",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
  ],
  educations: [
    {
      id: "1",
      level: "Bachelor",
      school: "SVN University",
      country: "Nepal",
      name: "Computer Engineering",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
    {
      id: "2",
      level: "Bachelor",
      school: "SVN University",
      country: "Nepal",
      name: "Computer Engineering",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
    {
      id: "3",
      level: "Bachelor",
      school: "SVN University",
      country: "Nepal",
      name: "Computer Engineering",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
  ],
  tranings: [
    {
      id: "1",
      name: "Computer Diploma",
      org: "NEET Academy",
      country: "Nepal",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
    {
      id: "2",
      name: "Graphic Designing",
      org: "Maya Instuate",
      country: "Nepal",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
    {
      id: "3",
      name: "Web Developer",
      org: "Star Web Acadamy",
      country: "Nepal",
      startDate: "Jul 1970",
      endDate: "Jul 2020",
    },
  ],
  languages: [
    {
      id: "1",
      skillName: "English",
      skillType: "Expert",
    },
    {
      id: "2",
      skillName: "Nepali",
      skillType: "Expert",
    },
    {
      id: "3",
      skillName: "Hindi",
      skillType: "Learner",
    },
  ],
};
*/
function ResumeScreen({ navigation }) {
  const { user, logOut } = useAuth();
  //const currrentUser = user.id;
  const currrentUser = 1;

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    resume
      .getResumeDataSingle(currrentUser)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
    // or your any data fetching query
    // setUsers(getProfileApi.data);
    // setLoading(false);
  }, []);
  // const currrentUser = 2;

  // const [search, setSearch] = useState(0);
  /*
  const getListingsAPi = useApi(resume.getResumeData, { currrentUser });

  useEffect(() => {
    getListingsAPi.request(currrentUser);
  }, []);
*/
  // console.log(users.id);
  //console.log("hi");
  // console.log(users.data[0]);
  //idSetValue = users.data[0].id;

  // const users.data[0] = users.data[0];
  return (
    <>
      {/* <ActivityIndicator visible={getListingsAPi.loading} /> */}
      {!isLoading && users && (
        <Screen>
          <ScrollView>
            {/* 
          {!isLoading && users && (
            <View>
              <Text>Email : {}</Text>
              <Text>Name : {users.data[0].id}</Text>
            </View>
          )}
          */}

            <ProfileBasic
              name={
                users.data[0].firstName +
                " " +
                users.data[0].middleName +
                " " +
                users.data[0].lastName
              }
              email={users.data[0].email}
              emailStatus={users.data[0].emailStatus}
              mobileNo={users.data[0].mobileNo}
              mobileStatus={users.data[0].mobileStatus}
              country={users.data[0].countryLiveIn}
              profileType={users.data[0].profile_type}
              image={
                settings.imageUrl +
                "members/" +
                users.data[0].id +
                "/" +
                users.data[0].image
              }
            />

            <ResumeHeading
              id={users.data[0].id}
              title="Personal Details"
              type="Update"
              onPress={() =>
                navigation.navigate(
                  routes.PRO_PERSONAL_DETAILS,
                  users.data[0].id
                )
              }
            />

            <ResumeInnerView
              id={users.data[0].id}
              viewID={users.data[0].id}
              titleOne="Date of Birth :"
              titleFive={users.data[0].dob}
              titleTwo="Gender :"
              titleSix={users.data[0].sex}
              titleThree="Nationality :"
              titleSeven={users.data[0].nationality}
              titleFour="Country Live in :"
              titleEight={users.data[0].countryLiveIn}
            />

            <ResumeHeading
              id={users.data[0].id}
              title="Skills"
              type="Add"
              onPress={() =>
                navigation.navigate(routes.PRO_SKILL, users.data[0].id)
              }
            />
            {users.data[0].get_skill.map((d, idx) => (
              <ResumeInnerView
                key={idx}
                id={users.data[0].id}
                viewID={d.viewID}
                titleOne={d.skillName}
                titleTwo={d.skill_level}
                onPressUpdate={() =>
                  navigation.navigate(routes.PRO_SKILL, users.data[0].id)
                }
                onPressDelete={() =>
                  navigation.navigate(routes.PRO_SKILL, users.data[0].id)
                }
              />
            ))}

            <ResumeHeading
              id={users.data[0].get_job_preferences.id}
              title="Job Preferences"
              type="Update"
              onPress={() =>
                navigation.navigate(
                  routes.PRO_JOB_PREFERENCES,
                  users.data[0].id
                )
              }
            />
            {users.data[0].get_job_preferences.map((jbp, idx) => (
              <ResumeInnerView
                key={idx}
                id={users.data[0].id}
                viewID={jbp.viewID}
                titleOne={jbp.industry}
                titleTwo={jbp.function}
                titleThree={jbp.city + ", " + jbp.country}
                titleFour={jbp.type}
                onPressDelete={() =>
                  navigation.navigate(
                    routes.PRO_JOB_PREFERENCES,
                    users.data[0].id
                  )
                }
              />
            ))}

            <ResumeHeading
              id={users.data[0].id}
              title="Work Experience"
              type="Add"
              onPress={() =>
                navigation.navigate(routes.PRO_EXPERIENCE, users.data[0].id)
              }
            />
            {users.data[0].get_experiences.map((exp, idx) => (
              <ResumeInnerView
                key={idx}
                id={users.data[0].id}
                viewID={exp.id}
                titleOne={exp.post}
                titleTwo={exp.company + ", " + exp.country}
                titleThree={exp.startDate + " - " + exp.endDate}
                onPressUpdate={() =>
                  navigation.navigate(routes.PRO_EXPERIENCE, users.data[0].id)
                }
                onPressDelete={() =>
                  navigation.navigate(routes.PRO_EXPERIENCE, users.data[0].id)
                }
              />
            ))}

            <ResumeHeading
              id={users.data[0].id}
              title="Educational Information"
              type="Add"
              onPress={() =>
                navigation.navigate(routes.PRO_EDUCATION, users.data[0].id)
              }
            />
            {users.data[0].get_education.map((edu, idx) => (
              <ResumeInnerView
                key={idx}
                id={users.data[0].id}
                viewID={edu.viewID}
                titleOne={edu.subject}
                titleTwo={edu.level}
                titleThree={edu.school + ", " + edu.country}
                titleFour={edu.startDate + " - " + edu.endDate}
                onPressUpdate={() =>
                  navigation.navigate(routes.PRO_EDUCATION, users.data[0].id)
                }
                onPressDelete={() =>
                  navigation.navigate(routes.PRO_EDUCATION, users.data[0].id)
                }
              />
            ))}

            <ResumeHeading
              id={users.data[0].id}
              title="Training & Certifications "
              type="Add"
              onPress={() =>
                navigation.navigate(routes.PRO_TRAINING, users.data[0].id)
              }
            />
            {users.data[0].get_tranings.map((trn, idx) => (
              <ResumeInnerView
                key={idx}
                id={users.data[0].id}
                viewID={trn.viewID}
                titleOne={trn.name}
                titleTwo={trn.org + ", " + trn.country}
                titleThree={trn.startDate + " - " + trn.endDate}
                onPressUpdate={() =>
                  navigation.navigate(routes.PRO_TRAINING, users.data[0].id)
                }
                onPressDelete={() =>
                  navigation.navigate(routes.PRO_TRAINING, users.data[0].id)
                }
              />
            ))}

            <ResumeHeading
              id={users.data[0].id}
              title="Languages"
              type="Add"
              onPress={() =>
                navigation.navigate(routes.PRO_LANGUAGE, users.data[0].id)
              }
            />
            {users.data[0].get_languages.map((ln, idx) => (
              <ResumeInnerView
                key={idx}
                id={users.data[0].id}
                viewID={ln.viewID}
                titleOne={ln.language_name}
                titleTwo={ln.language_level}
                onPressUpdate={() =>
                  console.log(
                    navigation.navigate(routes.PRO_LANGUAGE, users.data[0].id)
                  )
                }
                onPressDelete={() =>
                  console.log(
                    navigation.navigate(routes.PRO_LANGUAGE, users.data[0].id)
                  )
                }
              />
            ))}
          </ScrollView>
        </Screen>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: "900", padding: 10, marginLeft: 30 },
});

export default ResumeScreen;
