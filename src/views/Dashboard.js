import React, { useState } from "react";
import { toast } from "react-toastify";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import DataView from "../components/dashboard/dataView";
import Search from "../components/dashboard/search";
import Loader from "../components/loader";
import constants from "../flux/constants";
import { GET_REQUEST } from "../lib/request";

import exportFromJSON from 'export-from-json'

const Dashboard = () => {

    const [userName, setUserName] = useState("");
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [aadhar, setAadhar] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [epicNo, setEpicNo] = useState("")
    const [companyName, setCompanyName] = useState("");
    const [state, setState] = useState(0);
    const states = ["Maharashtra", "Delhi", "Gujarat"];
    const [activeIndex, setActiveIndex] = useState(0);
    const [loader, setLoader] = useState(0);
    const [searchText, setSearchText] = useState("")
    const [localSearchData, setSearchData] = useState([]);

    const [data, setData] = useState([])
    const [filename, setFilename] = React.useState("tracenow");
    const [selectedValue, setSelectedValue] = React.useState('xls');


    React.useEffect(() => {
        searchLocalNow()
    }, [searchText])

    const searchLocalNow = () => {
        if (data && data.length && searchText) {
            const search = searchText.toLowerCase();
            let filterData = [];
            setLoader(1)
            filterData = data.filter((obj) => (obj.cname && obj.cname.toLowerCase().includes(search))
                || (obj.fname && obj.fname.toLowerCase().includes(search))
                || (obj.adr && obj.adr.toLowerCase().includes(search))
                || (obj.ladd && obj.ladd.toLowerCase().includes(search))
                || (obj.padd && obj.padd.toLowerCase().includes(search))
                || (obj.email && obj.email.toLowerCase().includes(search)));
            setLoader(0)
            setSearchData(filterData);
        } else {
            setSearchData(data);
        }

    }

    const exportToCSV = () => {
        exportFromJSON({ data, fileName: filename, exportType: selectedValue })
    }

    const SearchInfo = (cname = userName, phone = mobile, code = pincode, mail = email, adNo = aadhar, addr = address, eNo = epicNo, cName = companyName) => {
        if (state < 0) {
            return;
        }
        setLoader(1)
        console.log('user', cname, userName)
        setData([])
        setSearchData([])
        setSearchText("")
        GET_REQUEST(`/search?matchType=1&userName=${cname}&mobile=${phone}&pincode=${code}&email=${mail}&aadhar=${adNo}&fName=${cname}&address=${addr}&epicNo=${eNo}&companyName=${cName}&state=${state}`)
            .then((response) => {
                setLoader(0)
                if (response && (response.status === 204 || response.status === 404 || response.status === 400)) {
                    toast.warn(constants.NO_DATA)
                    setData([])
                }
                if (response && response.data && response.data.data) {
                    setActiveIndex(1)
                    toast.success(constants.SUCCESS_MESSAGE)
                    // ClearInfo()
                    setData(response.data.data);
                }
            })
            .catch((error) => {
                setLoader(0)
                console.error("Error in search", error);
                toast.error(constants.INTERNAL_ERROR)
            })
    }

    const ClearInfo = () => {
        setUserName("");
        setEmail("")
        setMobile("")
        setEpicNo("")
        setAadhar("")
        setAddress("")
        setCompanyName("")
        setPincode("");
    }

    return (
        <Container fluid className="main-content-container px-4 pb-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Dashboard" subtitle="Search B2B Data" className="text-sm-left" />
            </Row>
            {
                activeIndex === 0 ?
                    <Search
                        userName={userName}
                        setUserName={setUserName}
                        mobile={mobile}
                        setMobile={setMobile}
                        email={email}
                        setEmail={setEmail}
                        aadhar={aadhar}
                        setAadhar={setAadhar}
                        address={address}
                        setAddress={setAddress}
                        pincode={pincode}
                        setPincode={setPincode}
                        epicNo={epicNo}
                        setEpicNo={setEpicNo}
                        companyName={companyName}
                        setCompanyName={setCompanyName}
                        setState={setState}
                        states={states}
                        state={state}
                        SearchInfo={SearchInfo}
                        ClearInfo={ClearInfo}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    /> :
                    <DataView
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        columns={constants.SEARCH_COLUMNS}
                        searchText={searchText}
                        setSearchText={setSearchText}
                        data={localSearchData && localSearchData.length ? localSearchData : data}
                        exportToCSV={exportToCSV}
                        SearchInfo={SearchInfo}
                    />
            }
            <Loader start={loader} />
        </Container>
    )
};

export default Dashboard;
