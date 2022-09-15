import React from "react";
import {
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    FormGroup,
} from "shards-react";

const CreateNotification = ({ title, setTitle, body, setBody }) => {

    return (

        <ListGroup flush>
            <ListGroupItem className="p-3">
                <Row>
                    <Col>
                        <Form>

                            <FormGroup>
                                <label htmlFor="feInputAddress">Title</label>
                                <FormInput value={title} onChange={(e) => setTitle(e.target.value)} id="feInputAddress" placeholder="Enter the Notification Title" />
                            </FormGroup>

                            <FormGroup>
                                <label htmlFor="feInputAddress">Body</label>
                                <FormInput value={body} onChange={(e) => setBody(e.target.value)} id="feInputAddress" placeholder="Enter Message body" />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </ListGroupItem>
        </ListGroup >
    );
}

export default CreateNotification;
