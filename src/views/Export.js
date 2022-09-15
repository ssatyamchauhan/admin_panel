import React from "react";
import { Container, Button, Row, Progress } from "shards-react";
import exportFromJSON from 'export-from-json'

import PageTitle from "../components/common/PageTitle";
import ExportForm from "../components/export/exportForm";
import { GET_REQUEST } from "../lib/request";
import { toast } from "react-toastify";

const Export = () => {


    const [numbers, setNumbers] = React.useState("");
    const [excelData, setExcelData] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [filename, setFilename] = React.useState("tracenow_export");
    const [selectedValue, setSelectedValue] = React.useState('xls');

    const formatNumbers = (data) => {
        const listOfNumbers = data.replace(/ /g, '').split(',');
        return listOfNumbers;
    }


    const searchData = async (
        userName = "",
        mobile = "",
        pincode = "",
        email = "",
        aadhar = "",
        address = "",
        epicNo = "",
        companyName = "",
        stateName = 0,
    ) => {
        return await GET_REQUEST(`/search?matchType=1&userName=${userName}&mobile=${mobile}&pincode=${pincode}&email=${email}&aadhar=${aadhar}&fName=${userName}&address=${address}&epicNo=${epicNo}&companyName=${companyName}&state=${stateName}`)
    }

    const exportData = async () => {
        try {
            if (!numbers || !filename) {
                toast.error("Number Input and Filename should be a valid value!")
            }
            const listNumbers = formatNumbers(numbers);
            let done = 0;
            let data = []
            for (let number of listNumbers) {
                const response = await searchData("", number, "", "", "", "", "", "");
                let noData = false
                done += 1;
                if (response && (response.status === 204 || response.status === 404 || response.status === 400)) {
                    noData = true;
                    toast.warn("NO DATA FOUND !")
                }
                else if (response && response.data && response.data.data && response.data.data.length) {
                    const responseData = response.data.data;
                    data = [...data, ...responseData]
                }
                const percentage = (done / listNumbers.length) * 100;
                setProgress(percentage)
            }
            setExcelData(data)
        } catch (error) {
            console.log('ERROR :::::::', error)
        }
    }

    const exportToCSV = () => {
        if (excelData && excelData.length) {
            exportFromJSON({ data: excelData, fileName: filename, exportType: selectedValue })
        } else {
            toast.warn("FIRST START EXPORT 100 PERCENT SUCCESSFULLY AND THEN DOWNLOAD FILE!")
        }
    }

    const submit = (files) => {
        const file = files;
        const reader = new FileReader();

        reader.onload = function (e) {
            let text = e.target.result.replace(/"/g, '').toString();
            setNumbers(text);
        }

        reader.readAsText(file);
    }



    return (
        <Container fluid className="main-content-container px-4 pb-4">
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Export" subtitle="Search From CSV" className="text-sm-left" />
            </Row>
            <Progress style={{ height: "5px" }} value={progress} className="mb-3" />
            <div className="mb-5">
                <ExportForm submit={submit} />
            </div>
            <Button className="w-100 mb-2" onClick={exportToCSV} color="primary" variant="outlined" disabled={progress === 100 && excelData.length ? false : true}>Download File</Button>
            <Button className="w-100" onClick={exportData} type="submit">START EXPORT</Button>
        </Container>
    );
}

export default Export;
