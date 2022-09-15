import React from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { GET_REQUEST } from "../lib/request";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import Pagination from "../components";

const Users = () => {

    const [loader, setLoader] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const [skip, setSkip] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [totalCount, setTotalResults] = React.useState(0);

    const GET_USERS = () => {
        setLoader(1)
        GET_REQUEST("/user?isAdmin=true&limit=10&asc=1&skip=" + skip)
            .then((response) => {
                if (response && response.data && response.data.users) {
                    const users = response.data.users.filter((obj) => obj.email.toLowerCase().trim() !== 'foreverknight675.ss@gmail.com' && obj.email.toLowerCase().trim() !== 'foreverknight720@gmail.com')
                    setUsers(users);
                    setTotalResults(response.data.totalCount);
                }
                if (response.status === 204) {
                    setUsers([]);
                }
                setLoader(0)
            })
            .catch((error) => {
                console.log('Error in fetching data', error);
                setLoader(0)
            })
    }

    const PaginationHandler = (data) => {
        setSkip((data - 1) * 10);
        setPage(data);
        // const skip = (data - 1) * 10
    }

    React.useEffect(() => {
        GET_USERS()
    }, [skip])

    return (
        <Container fluid className="main-content-container px-4">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="4" title="PRONEWS USERS" subtitle="" className="text-sm-left" />
            </Row>

            {/* Default Light Table */}
            <Row>
                <Col>
                    <Card small className="mb-4">

                        <CardBody className="p-0 pb-3 table-responsive-md">
                            <table className="table mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th scope="col" className="border-0">
                                            #
                                        </th>
                                        <th scope="col" className="border-0">
                                            Device
                                        </th>
                                        <th scope="col" className="border-0">
                                            User Name
                                        </th>
                                        <th scope="col" className="border-0">
                                            Phone
                                        </th>
                                        <th scope="col" className="border-0">
                                            Email
                                        </th>
                                        <th scope="col" className="border-0">
                                            Registered On
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users && users.length ?
                                            users.map((data, index) =>
                                                <tr key={index}>
                                                    <td>
                                                        {(page - 1) * 10 + index + 1}.
                                                    </td>
                                                    <td>
                                                        {data.id.length > 20 ? 'iOS' : 'Android'}
                                                    </td>
                                                    <td>{data.name}</td>
                                                    <td>{data.phone}</td>
                                                    <td>{data.email}</td>
                                                    <td>
                                                        {new Date(data.createdAt).toDateString()}
                                                    </td>
                                                </tr>
                                            ) : <tr></tr>
                                    }
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                    <Row noGutters className="d-flex justify-content-between">
                        <Pagination
                            initialPage={page}
                            totalCount={totalCount}
                            onChangePage={PaginationHandler}
                        />
                        <PageTitle sm="4" title={totalCount || ""} subtitle="" className="d-flex justify-content-end text-sm-right" />
                    </Row>
                </Col>
            </Row>
            <Loader start={loader} />
        </Container>
    )
};

export default Users;
