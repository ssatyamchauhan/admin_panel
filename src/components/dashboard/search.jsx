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
    FormSelect,
    Button
} from "shards-react";
import "../../styling/styles/search.css";

const Search = ({ state, title, subTitle, activeIndex, setActiveIndex, pincode, SearchInfo, ClearInfo, setPincode, states, setState, userName, setUserName, mobile, setMobile, email, setEmail, address, setAddress, epicNo, setEpicNo, aadhar, setAadhar, companyName, setCompanyName }) => (

    <Card small className="mb-4">
        <CardHeader className="d-flex border-bottom" style={{backgroundColor: "#F6F7FF"}}>
            <h6 role="button" onClick={() => setActiveIndex(0)} className={`mr-5 ${activeIndex === 0 ? "active" : ""}`}>{title}</h6>
            <h6 role="button" onClick={() => setActiveIndex(1)} className={`ml-5 ${activeIndex === 0 ? "" : "active"}`}>{subTitle}</h6>
        </CardHeader>
        <ListGroup flush>
            <ListGroupItem className="p-3" style={{backgroundColor: "#F6F7FF"}}>
                <Row>
                    <Col>
                        <Form autoComplete="off">
                            <Row form>
                                {/* First Name */}
                                <Col md="4" className="form-group">
                                    <FormSelect onChange={(event) => setState(parseInt(event.target.value))} id="feInputState">
                                        {states && states.length
                                            ? states.map((state, index) => <option style={{fontWeight: "bold"}} key={index} value={index}>{state}</option>)
                                            : <option>Choose ...</option>
                                        }
                                    </FormSelect>
                                </Col>
                                {/* Last Name */}
                                <Col md="4" className="form-group">
                                    <FormInput
                                        style={{fontWeight: "bold"}}
                                        id="feLastName"
                                        label="Name"
                                        placeholder="Name"
                                        value={userName}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                SearchInfo()
                                            }
                                        }}
                                        onChange={(event) => setUserName(event.target.value)}
                                    />
                                </Col>
                                <Col md="4" className="form-group">
                                    <FormInput
                                        id="feLastName"
                                        style={{fontWeight: "bold", color: "black"}}
                                        placeholder="Mobile"
                                        value={mobile}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                SearchInfo()
                                            }
                                        }}
                                        onChange={(event) => setMobile(event.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row form>
                                {/* First Name */}
                                <Col md="4" className="form-group">
                                    <FormInput
                                        id="feFirstName"
                                        style={{fontWeight: "bold", color: "black"}}
                                        placeholder="Email"
                                        value={email}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                SearchInfo()
                                            }
                                        }}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Col>
                                {/* Last Name */}
                                <Col md="4" className="form-group">
                                    <FormInput
                                        disabled={state === 0 ? false : true}
                                        id="feLastName"
                                        style={{fontWeight: "bold", color: "black"}}
                                        placeholder="Identification No."
                                        value={aadhar}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                SearchInfo()
                                            }
                                        }}
                                        onChange={(event) => setAadhar(event.target.value)}
                                    />
                                </Col>
                                <Col md="4" className="form-group">
                                    <FormInput
                                        id="feLastName"
                                        style={{fontWeight: "bold", color: "black"}}
                                        placeholder="Address"
                                        value={address}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                SearchInfo()
                                            }
                                        }}
                                        onChange={(event) => setAddress(event.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row form>
                                {/* First Name */}
                                <Col md="4" className="form-group">
                                    <FormInput
                                        id="feFirstName"
                                        style={{fontWeight: "bold", color: "black"}}
                                        placeholder="Pincode"
                                        value={pincode}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                SearchInfo()
                                            }
                                        }}
                                        onChange={(event) => setPincode(event.target.value)}
                                    />
                                </Col>
                                {/* Last Name */}
                                <Col md="4" className="form-group">
                                    <FormInput
                                        disabled={state === 0 ? false : true}
                                        id="feLastName"
                                        style={{fontWeight: "bold", color: "black"}}
                                        placeholder="Id No."
                                        value={epicNo}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                SearchInfo()
                                            }
                                        }}
                                        onChange={(event) => setEpicNo(event.target.value)}
                                    />
                                </Col>
                                <Col md="4" className="form-group">
                                    <FormInput
                                        id="feLastName"
                                        style={{fontWeight: "bold", color: "black"}}
                                        placeholder="Company Name"
                                        value={companyName}
                                        onKeyPress={event => {
                                            if (event.key === "Enter") {
                                                SearchInfo()
                                            }
                                        }}
                                        onChange={(event) => setCompanyName(event.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md="1" className="form-group">
                                    <Button theme="accent" onKeyPress={event => {
                                        if (event.key === "Enter") {
                                            SearchInfo()
                                        }
                                    }}
                                        onClick={() => SearchInfo()}>Search</Button>
                                </Col>
                                <Col md="1" className="form-group">
                                    <Button theme="warning" onClick={() => ClearInfo()}>Clear</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup>
    </Card>
);

Search.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    subTitle: PropTypes.string
};

Search.defaultProps = {
    title: "Live Search",
    subTitle: "Data View"
};

export default Search;