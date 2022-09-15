import React from "react";
import {
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
} from "shards-react";
import Dropzone from "../common/Dropzone";

const ExportForm = (props) => (
    <ListGroup flush>
        <ListGroupItem className="p-3 mb-5">
            <Row>
                <Col>
                    <Form>
                        <Dropzone submit={props.submit} />
                    </Form>
                </Col>
            </Row>
        </ListGroupItem>
    </ListGroup>
);

export default ExportForm;
