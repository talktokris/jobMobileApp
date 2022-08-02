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
import userUpdate from "../api/userUpdate";

function ResumeScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const currrentUser = user.id;
  //const currrentUser = 1;
  //console.log(currrentUser);

  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  /*
  useEffect(() => {
    getData();
  }, []);

  */

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getData();
    });
    return unsubscribe;
  }, [navigation]);

  const getData = useCallback(() => {
    setLoading(true); // Start the loader, So when you start fetching data, you can display loading UI
    // useApi(resume.getResumeData, { currrentUser });
    resume
      .getResumeDataSingle(currrentUser)
      .then((data) => {
        setUsers(data);
        setLoading(false);
        // console.log(data);
      })
      .catch((error) => {
        // display error
        setLoading(false); // stop the loader
      });
  }, []);

  // Delete Skill Item
  const clickSkillDelete = async (id) => {
    // console.log(id);

    const result = await userUpdate.skillDelete(id);
    // console.log(result);
    if (!result.ok) return;
    if (!result.data) {
      // console.log(data);
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      navigation.navigate(routes.PRO_DONE, { message: messageSend });
    } else {
    }
  };

  // Delete Language Item
  const clickLanguageDelete = async (id) => {
    // console.log(id);

    const result = await userUpdate.languageDelete(id);
    // console.log(result);
    if (!result.ok) return;
    if (!result.data) {
      // console.log(data);
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      navigation.navigate(routes.PRO_DONE, { message: messageSend });
    } else {
    }
  };

  // Delete Training Item
  const clickTrainingDelete = async (id) => {
    // console.log(id);

    const result = await userUpdate.trainingDelete(id);
    // console.log(result);
    if (!result.ok) return;
    if (!result.data) {
      // console.log(data);
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      navigation.navigate(routes.PRO_DONE, { message: messageSend });
    } else {
    }
  };

  // Delete Education Item
  const clickEducationDelete = async (id) => {
    // console.log(id);

    const result = await userUpdate.educationDelete(id);
    // console.log(result);
    if (!result.ok) return;
    if (!result.data) {
      // console.log(data);
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      navigation.navigate(routes.PRO_DONE, { message: messageSend });
    } else {
    }
  };

  // Delete Job Experince Item
  const experienceDelete = async (id) => {
    // console.log(id);

    const result = await userUpdate.experienceDelete(id);
    // console.log(result);
    if (!result.ok) return;
    if (!result.data) {
      // console.log(data);
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      navigation.navigate(routes.PRO_DONE, { message: messageSend });
    } else {
    }
  };

  // Delete Job Experince Item
  const jobPreferenceDelete = async (id) => {
    // console.log(id);

    const result = await userUpdate.jobPreferenceDelete(id);
    // console.log(result);
    if (!result.ok) return;
    if (!result.data) {
      // console.log(data);
    } else if (result.data.status == "success") {
      const messageSend = result.data.message;
      navigation.navigate(routes.PRO_DONE, { message: messageSend });
    } else {
    }
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      {!isLoading && users.data && (
        <Screen>
          <ScrollView>
            <ProfileBasic
              name={users.data[0].name}
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
              imgStatus={users.data[0].image}
              onPress={() => {
                navigation.navigate(routes.PRO_PHOTO_UPLOAD, {
                  user_id: users.data[0].id,
                  item: users.data[0],
                });
              }}
            />

            <ResumeHeading
              id={users.data[0].id}
              title="Basic Information"
              type="Update"
              onPress={() =>
                navigation.navigate(routes.PRO_RESUME_BASIC, {
                  user_id: users.data[0].id,
                  item: users.data[0],
                })
              }
            />

            <ResumeInnerView
              id={users.data[0].id}
              viewID={users.data[0].id}
              titleOne="Profile Type :"
              titleFive={users.data[0].profile_type}
              titleTwo="Gender :"
              titleSix={users.data[0].sex}
              titleThree="Date of Birth :"
              titleSeven={users.data[0].dob}
              titleFour="Mobile No :"
              titleEight={users.data[0].mobileNo}
            />

            <ResumeHeading
              id={users.data[0].id}
              title="Personal Information"
              type="Update"
              onPress={() =>
                navigation.navigate(routes.PRO_RESUME_PERSONAL, {
                  user_id: users.data[0].id,
                  item: users.data[0],
                })
              }
            />

            <ResumeInnerView
              id={users.data[0].id}
              viewID={users.data[0].id}
              titleOne="Nationality:"
              titleFive={users.data[0].nationality}
              titleTwo="Live In :"
              titleSix={users.data[0].countryLiveIn}
              titleThree="Marital Status :"
              titleSeven={users.data[0].maritalStatus}
              titleFour="Religion :"
              titleEight={users.data[0].religion}
            />
            <ResumeInnerView
              id={users.data[0].id}
              viewID={users.data[0].id}
              titleOne="weight:"
              titleFive={users.data[0].weight + " KG"}
              titleTwo="Height :"
              titleSix={users.data[0].height}
            />

            <ResumeHeading
              id={users.data[0].id}
              title="Skills"
              type="Add"
              onPress={() =>
                navigation.navigate(routes.PRO_SKILL, {
                  user_id: users.data[0].id,
                  item: {},
                })
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
                  navigation.navigate(routes.PRO_SKILL_UPDATE, {
                    user_id: users.data[0].id,
                    item: { d },
                  })
                }
                onPressDelete={() => clickSkillDelete(d.id)}
              />
            ))}

            <ResumeHeading
              id={users.data[0].get_job_preferences.id}
              title="Job Preferences"
              type="Add"
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
                onPressDelete={() => jobPreferenceDelete(jbp.id)}
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
                  navigation.navigate(routes.PRO_EXPERIENCE_UPDATE, {
                    user_id: users.data[0].id,
                    item: { exp },
                  })
                }
                onPressDelete={() => experienceDelete(exp.id)}
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
                  navigation.navigate(routes.PRO_EDUCATION_UPDATE, {
                    user_id: users.data[0].id,
                    item: { edu },
                  })
                }
                onPressDelete={() => clickEducationDelete(edu.id)}
              />
            ))}

            <ResumeHeading
              id={users.data[0].id}
              title="Training & Certifications "
              type="Add"
              onPress={() =>
                navigation.navigate(routes.PRO_TRAINING, {
                  user_id: users.data[0].id,
                  item: {},
                })
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
                  navigation.navigate(routes.PRO_TRAINING_EDIT, {
                    user_id: users.data[0].id,
                    item: { trn },
                  })
                }
                onPressDelete={() => clickTrainingDelete(trn.id)}
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
                  navigation.navigate(routes.PRO_LANGUAGE_UPDATE, {
                    user_id: users.data[0].id,
                    item: { ln },
                  })
                }
                onPressDelete={() => clickLanguageDelete(ln.id)}
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
