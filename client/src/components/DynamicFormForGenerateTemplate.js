import React, { useEffect, useState } from "react";
import axios from "axios";
import Legend from "./Legend";

function DynamicFormForGenerateTemplate() {
  const [numForms, setNumForms] = useState(0);
  const [formDataArray, setFormDataArray] = useState([]);
  const [nameOfTemplate, setNameOfTemplate] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});
  const [editFormData, setEditFormData] = useState({});

  const [isEnterClicked, setIsEnterClicked] = useState(false);
  const [isEditTemplateClicked, setIsEditTemplateClicked] = useState(false);
  const [allTemplate, setAllTemplate] = useState([]);
  // const token = localStorage.getItem("token");

  useEffect(() => {
    setEditFormData(dataForEdit);
  }, [dataForEdit]);

  const generateForms = () => {
    if (numForms > 0) {
      const forms = [];
      for (let i = 0; i < numForms; i++) {
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
        };
        forms.push(formData);
      }
      setFormDataArray(forms);
      setIsEnterClicked(true);
      setIsEditTemplateClicked(false);
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

  const generateTemplate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/template/bulk",
        formDataArray
      );
      console.log(response);
    } catch (error) {}
    console.log(formDataArray); // You can send this data to your server or process it as needed
  };

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:8080/api/template/all"
      );
      console.log(response);
      setAllTemplate(response.data);
      setIsEditTemplateClicked(true);
      setIsEnterClicked(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTemplateHandler = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/template/all`
      );
      const templateToEdit = response.data.filter((item) => item.id === id);
      setDataForEdit(templateToEdit[0]);
      console.log(templateToEdit);
    } catch (error) {
      console.log(error);
    }
  };

  const dataChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const editDataHandler = async (e) => {
    e.preventDefault();
    try {
      // console.log(editFormData);
      const response = await axios.put(
        `http://localhost:8080/api/template/${editFormData.id}`,
        editFormData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Generisanje sablona trcanja</h1>
      <div>
        <label>
          Naziv sablona:
          <input onChange={(e) => setNameOfTemplate(e.target.value)} />
        </label>
        <label>
          Broj nedelja za trcanje:
          <input
            type="number"
            value={numForms}
            onChange={(e) => setNumForms(parseInt(e.target.value, 10) || 0)}
          />
        </label>
        <button onClick={generateForms}>Enter</button>
        <button onClick={editHandler}>Edit template</button>
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
                  {/* <div>
                <label>
                  Naziv sablona:
                  <input
                    type="text"
                    onChange={handleInputChange(index, "templateName")}
                  />
                </label>
              </div> */}
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
          <button onClick={generateTemplate}>Generate template</button>
        </div>
      )}
      {isEditTemplateClicked && (
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
              </tr>
            </thead>
            <tbody>
              {allTemplate?.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                  onClick={() => editTemplateHandler(item.id)}
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
                </tr>
              ))}
            </tbody>
          </table>
          <form>
            <div>
              <label>
                Broj nedelja
                <input
                  type="text"
                  name="weekNumber"
                  value={editFormData?.weekNumber}
                  onChange={dataChange}
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
                  onChange={dataChange}
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
                  onChange={dataChange}
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
                  onChange={dataChange}
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
                  onChange={dataChange}
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
                  onChange={dataChange}
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
                  onChange={dataChange}
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
                  onChange={dataChange}
                />
              </label>
            </div>
            <button type="button" onClick={editDataHandler}>
              {" "}
              Enter
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DynamicFormForGenerateTemplate;
