import React, { useState } from "react";
import "./HomeAdmin.css";
import axios from "axios";
// import DynamicTable from './DynamicTable';
import TrainingPlan from "./TrainingPlan";
import DynamicFormForGenerateProgram from "../components/admin/DynamicFormForGenerateProgram";
import DynamicFormForGenerateTemplate from "./DynamicFormForGenerateTemplate";

const HomeAdmin = ({ users }) => {
  const [record, setRecord] = useState({});
  const [isGenerateTemplate, setIsGenerateTemplate] = useState(false);
  const [isGenerateProgram, setIsGenerateProgram] = useState(false);
  // const [numberOfWeeks, setNumberOfWeeks] = useState(0);

  // const [paceInfo, setPaceInfo] = useState("");

  const handleUserRecordsData = async (id) => {
    try {
      const responseRecords = await axios.get(
        `http://localhost:8080/api/records/${id}`
      );

      const length = responseRecords.data.length; //i need length-1 to give me back latest user input
      console.log(responseRecords.data[0]);
      setRecord(responseRecords.data[length - 1]);
      const responseTrainigForUser = await axios.get(
        `http://localhost:8080/api/training/${id}`
      );
      console.log(responseTrainigForUser);
    } catch (error) {
      console.log(error);
    }
  };

  // const handlePace = async (e) => {
  //   e.preventDefault();
  //   const responsePace = await axios.get(
  //     `http://localhost:8080/api/pace/${record?.vo2max}`
  //   );
  //   console.log(responsePace);
  //   setPaceInfo(responsePace.data[0]?.pace);
  // };

  const generateTemplateHandler = (e) => {
    e.preventDefault();
    setIsGenerateTemplate(true);
    setIsGenerateProgram(false);
  };
  const generateProgramHandler = (e) => {
    e.preventDefault();
    setIsGenerateProgram(true);
    setIsGenerateTemplate(false);
  };
  // const numberOfWeeksHandler = (e) => {
  //   e.preventDefault();
  //   console.log(numberOfWeeks);
  // };

  return (
    <div>
      <button onClick={generateTemplateHandler}>Generate Template</button>
      <button onClick={generateProgramHandler}>Generate Program</button>
      {isGenerateTemplate && (
        <div>
          <DynamicFormForGenerateTemplate />
        </div>
      )}
      {isGenerateProgram && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  onClick={() => handleUserRecordsData(item.id)}
                >
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <p>Level: {record?.level}</p>
            <p>Meters: {record?.meters}</p>
            <p>Trenutni vo2max: {record?.currentVo2max}</p>
            <p>Zeljeni vo2Max: {record?.vo2max}</p>
            <p>Weeks: {record?.weeks}</p>
            {/* <button onClick={handlePace}>Find pace</button> */}
            {/* <p>Pace:{paceInfo}</p> */}
          </div>
          {/* <DynamicTable /> */}
          {/* <TrainingPlan weeks={record?.weeks} />*/}
          <DynamicFormForGenerateProgram record={record} />
        </div>
      )}
    </div>
  );
};

export default HomeAdmin;
