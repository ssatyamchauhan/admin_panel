import React from "react";
import { Container, Row, Col, Card, CardHeader, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { GET_REQUEST, POST_REQUEST } from "../lib/request";
import CreateNotification from "../components/notification/CreateNotification";
import { toast } from "react-toastify";
import Loader from "../components/loader";

const Notifications = () => {

    const [totalCount, setTotalCount] = React.useState(0);
    const [selected, setSelected] = React.useState(0)
    const [title, setTitle] = React.useState("");
    const [body, setBody] = React.useState("");
    const [loader, setLoader] = React.useState(0);

    const GET_Notification = (endpoint) => {
        setLoader(1)
        GET_REQUEST(endpoint)
            .then((response) => {
                if (response && response.data && response.data.data) {
                    response && response.data && response.data.count ? setTotalCount(response.data.count) : setTotalCount(0)
                }
                setLoader(0)
            })
            .catch((error) => {
                console.log('Error in fetching notification data', error);
                setLoader(0)
            })
    }

    React.useEffect(() => {
        if (!selected) {
            setTitle("")
            setBody("");
            GET_Notification("/notification?appName=ProNews");
        }
    }, [selected]);

    const SendNotification = () => {
        if (!title || !body) {
            toast.warn("title and body is required to send notification")
            return;
        }
        setLoader(1);
        POST_REQUEST("/notification", { message: { notification: { title, body } } })
            .then((d) => {
                toast.success("Notification sent All Successfully!");
                setLoader(0)
                setSelected(0)
            }).catch((e) => {
                setLoader(0)
                setSelected(1)
            })
    }

    return (
        <Container fluid className="main-content-container px-4 pb-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="Notifications" subtitle="" className="text-sm-left" />
            </Row>

            <Row>
                {/* Editor */}
                <Col>
                    <Card>
                        <CardHeader className="d-flex border-bottom">
                            <div>
                                <button onClick={() => setSelected(0)} className="mr-2 pr-4">Send Notification</button>
                            </div>
                            <div>
                                <button className="ml-2 pr-4">Total Users <strong>{totalCount ? totalCount : 0}</strong></button>
                            </div>
                        </CardHeader>

                        <CreateNotification
                            title={title}
                            setTitle={setTitle}
                            setBody={setBody}
                            body={body}
                        />

                        <Button onClick={() => SendNotification()} theme="primary" >Send Now</Button>
                    </Card>
                </Col>
            </Row>
            <Loader start={loader} />
        </Container>
    )
};

export default Notifications
