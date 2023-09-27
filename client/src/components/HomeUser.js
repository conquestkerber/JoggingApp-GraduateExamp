import React, { useEffect, useState } from "react";
import InputTimeRecord from "../InputTimeRecord";
import { useNavigate } from "react-router-dom";
import Legend from "../components/Legend";
import axios from "axios";

import TableProgramForUser from "../components/TableProgramForUser";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [programForUser, setProgramForUser] = useState([]);
  const [currentVo2Max, setCurrentVo2Max] = useState(0);
  const [data, setData] = useState({
    currentVo2max: 0,
    vo2max: 0,
    meters: "",
    level: "",
    weeks: "",
  });
  const templateName = `template${data?.level}for${data?.meters}m`;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    setData((prev) => ({ ...prev, userId: user?.id }));
  }, []);

  //http://localhost:8080/api/records
  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/records",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const dataHandler = (e) => {
    const { name, value } = e.target;
    if (name === "vo2max") {
      const vo2 = parseInt(value, 10);
      setData((prev) => ({ ...prev, [name]: vo2 }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProgram = async (e) => {
    e.preventDefault();
    try {
      console.log(templateName);
      console.log(token);
      const response = await axios.get(
        `http://localhost:8080/api/template/${templateName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProgramForUser(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    //  console.log(users);
    if (!token) {
      navigate("/login");
    }
    setData((prev) => ({ ...prev, userId: user?.id }));
  }, []);

  const getVo2MaxData = (vo2max) => {
    // console.log(vo2max)
    setData((prev) => ({ ...prev, currentVo2max: vo2max }));
    setCurrentVo2Max(vo2max);
  };

  return (
    <div>
      <div>
        <br />
        <InputTimeRecord onBringVo2Max={getVo2MaxData} />
        {currentVo2Max > 0 && <label>Trenutni vo2max: {currentVo2Max}</label>}
        <p>Forma:</p>
        <label>
          Zeljeni vo2max:
          <select name="vo2max" onChange={dataHandler}>
            <option></option>
            <option value={currentVo2Max + 1}>{currentVo2Max + 1}</option>
            <option value={currentVo2Max + 2}>{currentVo2Max + 2}</option>
            <option value={currentVo2Max + 3}>{currentVo2Max + 3}</option>
            <option value={currentVo2Max + 4}>{currentVo2Max + 4}</option>
            <option value={currentVo2Max + 5}>{currentVo2Max + 5}</option>
          </select>
        </label>
        <label>
          Duzina trke:
          <select name="meters" onChange={dataHandler}>
            <option></option>
            <option value="5000">5k</option>
            <option value="10000">10k</option>
            <option value="21000">21k</option>
            <option value="42000">42k</option>
          </select>
        </label>
        <label>
          Tezina:
          <select name="level" onChange={dataHandler}>
            <option></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </label>
        <label>
          Broj nedelja programa:
          <select name="weeks" onChange={dataHandler}>
            <option></option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </label>
        <button onClick={handleNext}>NEXT</button>
        <button onClick={handleProgram}>Get Program</button>
      </div>
      {programForUser && (
        <div>
          <TableProgramForUser programForUser={programForUser} />
          {programForUser && data?.level && <Legend />}
        </div>
      )}
    </div>
  );
};

export default Home;
