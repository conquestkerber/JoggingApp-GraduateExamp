import React, { useEffect, useState } from "react";
import axios from "axios";
import Legend from "../Legend";

function DynamicFormForGenerateProgram({ record }) {
  // const [numForms, setNumForms] = useState(0);
  const [formDataArray, setFormDataArray] = useState([]);
  const [allTrainingsForSpecificUser, setAllTrainingsForSpecificUser] =
    useState([]);
  const [editedData, setEditedData] = useState({});
  const [editFormData, setEditFormData] = useState({});

  const [nameOfTemplate, setNameOfTemplate] = useState("");
  const [isEnterClicked, setIsEnterClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isOneTrainingClicked, setIsOneTrainingClicked] = useState(false);

  // const [weeks, setWeeks] = useState(0);
  const weeks = parseInt(record?.weeks, 10);

  useEffect(() => {
    setEditFormData(editedData);
  }, [editedData]);

  const generateForms = () => {
    if (weeks > 0) {
      const forms = [];
      for (let i = 0; i < weeks; i++) {
        const formData = {
          procentage: 0,
          po: "",
          ut: "",
          sr: "",
          ce: "",
          pe: "",
          su: "",
          ne: "",
          weekNumber: i + 1,
          templateName: nameOfTemplate,
          userId: record.userId,
        };
        forms.push(formData);
      }
      setFormDataArray(forms);
      setIsEnterClicked(true);
      setIsEditClicked(false);
      setIsOneTrainingClicked(false);
    }
  };

  const handleInputChange = (formIndex, fieldName) => (e) => {
    const value = e.target.value;

    if (fieldName === "procentage") {
      const procentage = parseInt(value, 10);
      setFormDataArray((prevData) => {
        const newData = [...prevData];
        newData[formIndex][fieldName] = procentage;
        return newData;
      });
    } else {
      setFormDataArray((prevData) => {
        const newData = [...prevData];
        newData[formIndex][fieldName] = value;
        return newData;
      });
    }
  };

  const handleEditDataChange = (e) => {
    // const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    // setEditFormData();
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const generateProgram = async (e) => {
    e.preventDefault();
    console.log(formDataArray);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/training/bulk",
        formDataArray
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(formDataArray); // You can send this data to your server or process it as needed
  };

  const editTrainingHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/training`);

      console.log(response);
      setAllTrainingsForSpecificUser(
        response.data.filter((item) => item.userId === record.userId)
      );
      setIsEditClicked(true);
      setIsEnterClicked(false);
      setIsOneTrainingClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTrainingForSpecificUser = async (id) => {
    try {
      const url = `http://localhost:8080/api/training/${id}`;
      const response = await axios.get(url);
      setEditedData(response.data);
      setIsEnterClicked(false);
      setIsOneTrainingClicked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      // console.log(editFormData);
      const response = await axios.put(
        `http://localhost:8080/api/training/${editFormData.id}`,
        editFormData
      );
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Generisanje programa trcanja</h1>
      <div>
        <label>
          Naziv sablona:
          <input onChange={(e) => setNameOfTemplate(e.target.value)} />
        </label>
        <button onClick={generateForms}>Generate</button>
        <button onClick={editTrainingHandler}>Edit</button>
      </div>
      {isEnterClicked && (
        <div>
          {" "}
          <div className="form-container">
            <Legend />
            {formDataArray.map((formData, index) => (
              <div key={index}>
                <form>
                  <h2>Nedelja {index + 1}</h2>
                  <div>
                    <label>
                      Procenat:
                      <input
                        type="text"
                        onChange={handleInputChange(index, "procentage")}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Ponedeljak:
                      <input
                        type="text"
                        onChange={handleInputChange(index, "po")}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Utorak:
                      <input
                        type="text"
                        onChange={handleInputChange(index, "ut")}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Sreda:
                      <input
                        type="text"
                        onChange={handleInputChange(index, "sr")}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Cetvrtak:
                      <input
                        type="text"
                        onChange={handleInputChange(index, "ce")}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Petak:
                      <input
                        type="text"
                        onChange={handleInputChange(index, "pe")}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Subota:
                      <input
                        type="text"
                        onChange={handleInputChange(index, "su")}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Nedelja:
                      <input
                        type="text"
                        onChange={handleInputChange(index, "ne")}
                      />
                    </label>
                  </div>
                </form>
              </div>
            ))}
          </div>
          <button onClick={generateProgram}>Generate template</button>
        </div>
      )}
      {isEditClicked && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Broj nedelja</th>
                <th>Ponedeljak</th>
                <th>Utorak</th>
                <th>Sreda</th>
                <th>Cetvrtak</th>
                <th>Petak</th>
                <th>Subota</th>
                <th>Nedelja</th>
                <th>Ime sablona</th>
                <th>UserId</th>
              </tr>
            </thead>
            <tbody>
              {allTrainingsForSpecificUser?.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  onClick={() => handleTrainingForSpecificUser(item.id)}
                >
                  <td>{item.id}</td>
                  <td>{item.weekNumber}</td>
                  <td>{item.po}</td>
                  <td>{item.ut}</td>
                  <td>{item.sr}</td>
                  <td>{item.ce}</td>
                  <td>{item.pe}</td>
                  <td>{item.su}</td>
                  <td>{item.ne}</td>
                  <td>{item.ne}</td>
                  <td>{item.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isOneTrainingClicked && (
        <div>
          <form>
            <div>
              <label>
                Broj nedelja
                <input
                  type="text"
                  name="weekNumber"
                  value={editFormData?.weekNumber}
                  onChange={handleEditDataChange}
                />
              </label>
            </div>
            <div>
              <label>
                Ponedeljak
                <input
                  type="text"
                  name="po"
                  value={editFormData?.po}
                  onChange={handleEditDataChange}
                />
              </label>
            </div>
            <div>
              <label>
                Utorak
                <input
                  type="text"
                  name="ut"
                  value={editFormData?.ut}
                  onChange={handleEditDataChange}
                />
              </label>
            </div>
            <div>
              <label>
                Sreda
                <input
                  type="text"
                  name="sr"
                  value={editFormData?.sr}
                  onChange={handleEditDataChange}
                />
              </label>
            </div>
            <div>
              <label>
                Cetvrtak
                <input
                  type="text"
                  name="ce"
                  value={editFormData?.ce}
                  onChange={handleEditDataChange}
                />
              </label>
            </div>
            <div>
              <label>
                Petak
                <input
                  type="text"
                  name="pe"
                  value={editFormData?.pe}
                  onChange={handleEditDataChange}
                />
              </label>
            </div>
            <div>
              <label>
                Subota
                <input
                  type="text"
                  name="su"
                  value={editFormData?.su}
                  onChange={handleEditDataChange}
                />
              </label>
            </div>
            <div>
              <label>
                Nedelja
                <input
                  type="text"
                  name="ne"
                  value={editFormData?.ne}
                  onChange={handleEditDataChange}
                />
              </label>
            </div>
            {/* <div>
              <label>
                Template name
                <input
                  type="text"
                  name="templateName"
                  value={
                    editedData.templateName || editedData.templateName || ""
                  }
                  onChange={handleEditDataChange}
                />
              </label>
            </div> */}
            <br />
            {/* Add more input fields for other data fields as needed */}
            <button type="button" onClick={handleUpdateData}>
              Enter
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DynamicFormForGenerateProgram;
