import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    FormInput,
    DatePicker,
    InputGroupAddon,
    InputGroupText,
    InputGroup
} from "shards-react";


const CreateUser = ({ header, selected, count, setCount, firstName, setName, userName, setUserName, email, setEmail, expiry, handleExpiry, password, setPassword }) => (
    <Card small className="h-100">
        {/* Card Header */}
        <CardHeader className="border-bottom">
            <h6 className="m-0">{header}</h6>
        </CardHeader>

        <CardBody className="d-flex flex-column">
            <Form autoComplete="off">
                <FormGroup>
                    <label htmlFor="feInputState">Name</label>
                    <FormInput style={{fontSize: "18px"}} value={firstName} onChange={(e) => setName(e.target.value)} id="feInputState" placeholder="Enter Name ..." />
                </FormGroup>
                {/* Username */}
                <FormGroup>
                    <label htmlFor="feInputState">User Name</label>
                    <FormInput style={{fontSize: "18px"}} value={userName} onChange={(e) => setUserName(e.target.value)} id="feInputState" placeholder="Enter Username ..." />
                </FormGroup>

                {/* Email */}
                <FormGroup>
                    <label htmlFor="feInputState">Email</label>
                    <FormInput style={{fontSize: "18px"}} value={email} onChange={(e) => setEmail(e.target.value)} id="feInputState" placeholder="Enter User Email" />
                </FormGroup>

                {/* Password */}
                <FormGroup>
                    <label htmlFor="feInputState">Password</label>
                    <FormInput style={{fontSize: "18px"}} value={password} onChange={(e) => setPassword(e.target.value)} id="feInputState" placeholder="Enter User Password" />
                </FormGroup>

                {/* Count */}
                {
                    selected === 3 ?
                        <FormGroup>
                            <label htmlFor="feInputState">Count</label>
                            <FormInput style={{fontSize: "18px"}} value={count} onChange={(e) => setCount(e.target.value)} id="feInputState" placeholder="Enter No Of User Creation" />
                        </FormGroup> : <></>
                }

                {/* Expiry */}
                <FormGroup>
                    <label htmlFor="feInputState">Expiry</label>
                    <InputGroup className="d-flex my-auto date-range">
                        <InputGroupAddon htmlFor="feInputState" type="append">
                            <InputGroupText>
                                <i className="material-icons">&#xE916;</i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <DatePicker
                            id="feInputState"
                            style={{fontSize: "18px"}}
                            size="sm"
                            selected={expiry}
                            onChange={handleExpiry}
                            placeholderText="Expiry Date"
                            dropdownMode="select"
                            className="text-center"
                        />
                    </InputGroup>
                </FormGroup>
            </Form>
        </CardBody>
    </Card>
);

CreateUser.propTypes = {
    /**
     * The component's title.
     */
    header: PropTypes.string
};

CreateUser.defaultProps = {
    header: "Create New User"
};

export default CreateUser;
