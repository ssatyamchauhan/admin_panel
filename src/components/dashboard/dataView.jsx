import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    Button,
} from "shards-react";
import "../../styling/styles/dataView.css";
import { getFromLocalStorage } from "../../lib/helper";

const DataView = ({ title, SearchInfo, exportToCSV, searchText, setSearchText, activeIndex, setActiveIndex, columns, data }) => {

    const handleClick = (name, value) => {
        try {
            if (typeof value !== "object") {
                console.log('hello world', name, value);
                if (name && value && typeof value !== "object") {
                    if (name == "mobile" || name == "altno") {
                        SearchInfo("", value)
                    } else if (name == "adr") {
                        SearchInfo("", "", "", "", value)
                    } else if (name == "email") {
                        SearchInfo("", "", "", value)
                    }
                }
            }
        } catch (error) {
            console.error("Something went wrong!")
        }
    }

    return (
        <Card small className="mb-4" style={{backgroundColor: "red"}}>
            <CardHeader className="d-flex w-100 justify-content-evenly border-bottom" style={{backgroundColor: "#F6F7FF"}}>
                <Row form className="w-100">
                    <h6 role="button" onClick={() => setActiveIndex(0)} className={`mr-5 ${activeIndex === 0 ? "active" : ""}`}>{title}</h6>
                    {getFromLocalStorage("role") === "Admin" ? <Button onClick={exportToCSV} disabled={data.length ? false : true} className="mr-5">CSV DOWNLOAD</Button> : <></>}
                    <FormInput disabled={data.length ? false : true} className="w-50 mr-5" placeholder="Local Search" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                </Row>
            </CardHeader>
            <ListGroup flush>
                <ListGroupItem className="p-3" style={{backgroundColor: "#F6F7FF"}}>
                    <Row>
                        <Col>
                            <Form>
                                <Row form>
                                    <table className="customTable" style={{ position: 'relative' }}>
                                        <thead>
                                            <tr>
                                                {
                                                    columns && columns.length ?
                                                        columns.map((headerObj, index) => <th key={index}>{headerObj.name}</th>)
                                                        : <></>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data && data.length ?
                                                    data.map((obj, index1) => <tr key={index1}>
                                                        {
                                                            columns.map((headerObj, index2) => <td key={index2} style={{ minWidth: headerObj.width, fontWeight: "bold", fontSize: "16px" }} >{
                                                                obj[headerObj.selector] && headerObj.link ? <a id="anchor" onClick={() => handleClick(headerObj.selector, obj[headerObj.selector])}>{obj[headerObj.selector]}</a> : obj[headerObj.selector] || "N/A"}
                                                            </td>)
                                                        }
                                                    </tr>
                                                    ) : <></>
                                            }
                                        </tbody>
                                    </table>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Card>
    );
}

DataView.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    subTitle: PropTypes.string
};

DataView.defaultProps = {
    title: "Live Search",
    subTitle: "Data View"
};

export default DataView;