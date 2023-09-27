import React, { useRef } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function TableProgramForUser({ programForUser }) {
  const pdfRef = useRef(null);

  // const generatePdf = () => {
  //   pdfRef.current.updateContainer();
  //   const pdfBlob = pdfRef.current.toBlob();
  //   saveAs(pdfBlob, "programForUser.pdf");
  // };
  const PdfDocument = () => (
    <Document>
      <Page size="A4">
        {programForUser?.map((item, index) => (
          <Text key={item.id}>
            {item.weekNumber} - {item.po} - {item.ut} - {item.sr} - {item.ce} -{" "}
            {item.pe} - {item.su} - {item.ne}
          </Text>
        ))}
      </Page>
    </Document>
  );

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(programForUser);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "ProgramForUser");
    XLSX.writeFile(workbook, "programForUser.xlsx");
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Redni broj nedelje</th>
            <th>Ponedeljak</th>
            <th>Utorak</th>
            <th>Sreda</th>
            <th>Cetvrtak</th>
            <th>Petak</th>
            <th>Subota</th>
            <th>Nedeljak</th>
          </tr>
        </thead>
        <tbody>
          {programForUser?.map((item, index) => (
            <tr
              key={item.id}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{item.weekNumber}</td>
              <td>{item.po}</td>
              <td>{item.ut}</td>
              <td>{item.sr}</td>
              <td>{item.ce}</td>
              <td>{item.pe}</td>
              <td>{item.su}</td>
              <td>{item.ne}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <button onClick={generatePdf}>Generate PDF</button> */}
      <button onClick={generateExcel}>Generate Excel</button>

      <PDFDownloadLink document={<PdfDocument />} fileName="programForUser.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>

      <div style={{ display: "none" }}>
        <Document ref={pdfRef}>
          <Page size="A4">{/* ... PDF content */}</Page>
        </Document>
      </div>
    </div>
  );
}
// const PdfDocument = ({ data }) => (
//   <Document>
//     <Page size="A4">
//       <View style={styles.container}>{/* ... PDF content */}</View>
//     </Page>
//   </Document>
// );

// const styles = StyleSheet.create({
//   container: {
//     // PDF styling
//   },
// });
export default TableProgramForUser;
