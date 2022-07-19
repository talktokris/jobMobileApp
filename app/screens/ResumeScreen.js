import React, { useContext } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import ProfileBasic from "../components/ProfileBasic";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

import Separater from "../components/Separater";
import ResumeHeading from "../components/ResumeHeading";
import ResumeInnerView from "../components/ResumeInnerView";
import routes from "../navigation/routes";
const profile = {
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
    profileType: "Professional",
    profileTitle: "IT Professional",
    image: require("../assets/images/av.jpg"),
  },
  skills: [
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

function ResumeScreen({ navigation }) {
  return (
    <Screen>
      <ScrollView>
        <ProfileBasic
          name={
            profile.basicInfo.firstName +
            " " +
            profile.basicInfo.middleName +
            " " +
            profile.basicInfo.lastName
          }
          email={profile.basicInfo.email}
          emailStatus={profile.basicInfo.emailStatus}
          mobileNo={profile.basicInfo.mobileNo}
          mobileStatus={profile.basicInfo.mobileStatus}
          country={profile.basicInfo.counryliveIn}
          profileType={profile.basicInfo.profileType}
          image={profile.basicInfo.image}
        />
        <ResumeHeading
          id={profile.id}
          title="Personal Details"
          type="Update"
          onPress={() =>
            navigation.navigate(routes.PRO_PERSONAL_DETAILS, profile.id)
          }
        />
        {profile.basicInfo && (
          <ResumeInnerView
            id={profile.id}
            viewID={profile.basicInfo.id}
            titleOne="Date of Birth :"
            titleFive={profile.basicInfo.dob}
            titleTwo="Gender :"
            titleSix={profile.basicInfo.sex}
            titleThree="Nationality :"
            titleSeven={profile.basicInfo.nationality}
            titleFour="Country Live in :"
            titleEight={profile.basicInfo.counryliveIn}
          />
        )}
        <ResumeHeading
          id={profile.id}
          title="Skills"
          type="Add"
          onPress={() => navigation.navigate(routes.PRO_SKILL, profile.id)}
        />
        {profile.skills.map((d, idx) => (
          <ResumeInnerView
            key={idx}
            id={profile.id}
            viewID={d.viewID}
            titleOne={d.skillName}
            titleTwo={d.skillType}
            onPressUpdate={() =>
              navigation.navigate(routes.PRO_SKILL, profile.id)
            }
            onPressDelete={() =>
              navigation.navigate(routes.PRO_SKILL, profile.id)
            }
          />
        ))}
        <ResumeHeading
          id={profile.id}
          title="Job Preferences"
          type="Update"
          onPress={() =>
            navigation.navigate(routes.PRO_JOB_PREFERENCES, profile.id)
          }
        />
        {profile.jobPreferences.map((jbp, idx) => (
          <ResumeInnerView
            key={idx}
            id={profile.id}
            viewID={jbp.viewID}
            titleOne={jbp.industry}
            titleTwo={jbp.function}
            titleThree={jbp.city + ", " + jbp.country}
            titleFour={jbp.type}
            onPressDelete={() =>
              navigation.navigate(routes.PRO_JOB_PREFERENCES, profile.id)
            }
          />
        ))}
        <ResumeHeading
          id={profile.id}
          title="Work Experience"
          type="Add"
          onPress={() => navigation.navigate(routes.PRO_EXPERIENCE, profile.id)}
        />
        {profile.experiences.map((exp, idx) => (
          <ResumeInnerView
            key={idx}
            id={profile.id}
            viewID={exp.id}
            titleOne={exp.post}
            titleTwo={exp.company + ", " + exp.country}
            titleThree={exp.startDate + " - " + exp.endDate}
            onPressUpdate={() =>
              navigation.navigate(routes.PRO_EXPERIENCE, profile.id)
            }
            onPressDelete={() =>
              navigation.navigate(routes.PRO_EXPERIENCE, profile.id)
            }
          />
        ))}
        <ResumeHeading
          id={profile.id}
          title="Educational Information"
          type="Add"
          onPress={() => navigation.navigate(routes.PRO_EDUCATION, profile.id)}
        />
        {profile.educations.map((edu, idx) => (
          <ResumeInnerView
            key={idx}
            id={profile.id}
            viewID={edu.viewID}
            titleOne={edu.name}
            titleTwo={edu.level}
            titleThree={edu.school + ", " + edu.country}
            titleFour={edu.startDate + " - " + edu.endDate}
            onPressUpdate={() =>
              navigation.navigate(routes.PRO_EDUCATION, profile.id)
            }
            onPressDelete={() =>
              navigation.navigate(routes.PRO_EDUCATION, profile.id)
            }
          />
        ))}
        <ResumeHeading
          id={profile.id}
          title="Training & Certifications "
          type="Add"
          onPress={() => navigation.navigate(routes.PRO_TRAINING, profile.id)}
        />
        {profile.tranings.map((trn, idx) => (
          <ResumeInnerView
            key={idx}
            id={profile.id}
            viewID={trn.viewID}
            titleOne={trn.name}
            titleTwo={trn.org + ", " + trn.country}
            titleThree={trn.startDate + " - " + trn.endDate}
            onPressUpdate={() =>
              navigation.navigate(routes.PRO_TRAINING, profile.id)
            }
            onPressDelete={() =>
              navigation.navigate(routes.PRO_TRAINING, profile.id)
            }
          />
        ))}
        <ResumeHeading
          id={profile.id}
          title="Languages"
          type="Add"
          onPress={() => navigation.navigate(routes.PRO_LANGUAGE, profile.id)}
        />
        {profile.languages.map((ln, idx) => (
          <ResumeInnerView
            key={idx}
            id={profile.id}
            viewID={ln.viewID}
            titleOne={ln.skillName}
            titleTwo={ln.skillType}
            onPressUpdate={() =>
              console.log(navigation.navigate(routes.PRO_LANGUAGE, profile.id))
            }
            onPressDelete={() =>
              console.log(navigation.navigate(routes.PRO_LANGUAGE, profile.id))
            }
          />
        ))}
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: "900", padding: 10, marginLeft: 30 },
});

export default ResumeScreen;
