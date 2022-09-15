import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, FormInput } from "shards-react";
import { toast } from "react-toastify";

import PageTitle from "../components/common/PageTitle";
import { DELETE_REQUEST, GET_REQUEST, PATCH_REQUEST, POST_REQUEST } from "../lib/request";
import Pagination from "../components/index";
import ActionButton from "../components/ActionButton";
import CreateUser from "../components/customers/createUser";
import Loader from "../components/loader";
import constants from "../flux/constants";


const Customers = ({ userDetails }) => {

    const [totalCount, setTotalCount] = React.useState(0);
    const [firstName, setName] = React.useState("")
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [expiry, setExpiry] = React.useState(new Date());

    const [data, setData] = React.useState([]);
    const [selected, setSelected] = React.useState(0)
    const [skip, setSkip] = React.useState(0)
    const [limit, setLimit] = React.useState(25)
    const [searchText, setSearchText] = React.useState("");
    const [loader, setLoader] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const [status, setStatus] = React.useState(1)
    const [userId, setUserId] = React.useState("")
    const [count, setCount] = React.useState(0)
    let timeout = 0;

    const GET_CUSTOMERS = async (text = searchText) => {
        try {
            setLoader(1)
            GET_REQUEST(`/user?skip=${skip}&limit=${limit}&status=${status || 0}&searchText=${text}`)
                .then((response) => {
                    if (response && response.status === 204) {
                        setData([])
                    } // No Data handler. there is no data handler. 
                    if (response && response.data && response.data.data) {
                        const data = response.data.data.map((obj, index) => {
                            return {
                                id: pageNumber === 1 ? index + 1 : (pageNumber - 1) * 25 + index + 1,
                                ...obj
                            }
                        });
                        setData([...data]);
                        setTotalCount(response.data.totalCount)
                    } // Data handler
                    setLoader(0)
                })
        } catch (error) {
            console.error("Your error", error);
            setLoader(0)
        }
    }

    React.useEffect(() => {
        if (selected !== 2) {
            setUserName("")
            setName("")
            setExpiry(new Date())
            setPassword("")
            setEmail("")
        }
        GET_CUSTOMERS()
    }, [selected])

    const handleExpiry = (dateTime) => {
        setExpiry(new Date(dateTime))
    }


    const createUser = () => {
        try {
            setLoader(1)
            if (!firstName || !expiry || !userName || !password || !email) {
                toast.warn(constants.MANADATORY);
                setLoader(0)
            } else {
                const today = new Date(expiry);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();

                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;

                const myExpiry = yyyy + '-' + mm + '-' + dd;

                POST_REQUEST(`/user`, { firstName, userName, password, email, expiry: myExpiry })
                    .then((response) => {
                        if (response.status === 200 || response.status === 201) {
                            toast.success(constants.SUCCESS_CREATE);
                            setSelected(0)
                        } else {
                            toast.error("USERNAME ALREADY EXISTS")
                        }
                        setLoader(0)
                    })
                    .catch((error) => {
                        toast.error(constants.INTERNAL_ERROR);
                        console.error('error', error);
                        setLoader(0)
                    })
            }
        } catch (error) {
            setLoader(0)
            toast.error(constants.INTERNAL_ERROR);
        }

    }

    const multiUser = () => {
        try {
            setLoader(1)
            if (!firstName || !expiry || !userName || !password || !email) {
                toast.warn(constants.MANADATORY);
                setLoader(0)
            } else {
                const today = new Date(expiry);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();

                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;

                const myExpiry = yyyy + '-' + mm + '-' + dd;

                POST_REQUEST(`/multi-user`, { name: firstName, username: userName, password, email, expiry: myExpiry, count })
                    .then((response) => {
                        if (response.status === 200 || response.status === 201) {
                            toast.success(constants.SUCCESS_CREATE);
                            setSelected(0)
                        } else {
                            toast.error("USERNAME ALREADY EXISTS")
                        }
                        setLoader(0)
                    })
                    .catch((error) => {
                        toast.error(constants.INTERNAL_ERROR);
                        console.error('error', error);
                        setLoader(0)
                    })
            }
        } catch (error) {
            setLoader(0)
            toast.error(constants.INTERNAL_ERROR);
        }

    }

    const deleteUser = (id) => {
        if (!id) {
            toast.error("USERID IS MISSING");
            return;
        }
        setLoader(1)
        DELETE_REQUEST(`/user`, { status: 0, userIds: [id] })
            .then((response) => {
                toast.success("DELETED SUCCESSFULLY!");
                GET_CUSTOMERS();
            })
            .catch((error) => {
                toast.error(constants.INTERNAL_ERROR);
                setLoader(0);
                console.error('Error in deleting user', error);
            })
    }

    const editUser = (id, call) => {
        if (call && userId) {
            const today = new Date(expiry);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const myExpiry = yyyy + '-' + mm + '-' + dd;
            PATCH_REQUEST(`/user`, { userId, firstName, userName, password, email, expiry: myExpiry })
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        toast.success(constants.SUCCESS_UPDATE);
                        setSelected(0)
                    } else {
                        toast.error(constants.INTERNAL_ERROR)
                    }
                    setLoader(0)
                })
                .catch((error) => {
                    toast.error(constants.INTERNAL_ERROR);
                    console.error('error', error);
                    setLoader(0)
                })
        } else {
            if (!id) {
                toast.warn("USERID IS MISSING!")
                return;
            }
            const userInfo = data.find((d) => d._id === id);
            if (userInfo) {
                setUserName(userInfo.userName || "");
                setEmail(userInfo.email || "");
                setName(userInfo.firstName || "")
                setPassword(userInfo.password || "");
                setExpiry(new Date(userInfo.expiry) || new Date());
                setUserId(id);
                setSelected(2);
            } else {
                toast.warn("USER NOT FOUND!")
            }
        }
    }

    const PaginationHandler = (data) => {
        setSkip((data - 1) * 25);
        setPage(data);
        const skip = (data - 1) * 25
    }

    React.useEffect(() => {
        GET_CUSTOMERS()
    }, [skip])


    const searchData = (keyword) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            setSearchText(keyword)
            GET_CUSTOMERS(keyword)
        }, 700);
    }

    if (selected) {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Customers" subtitle="TraceNow Users" className="text-sm-left" />
                </Row>

                <Row>
                    {/* Editor */}
                    <Col>
                        <Card>
                            <CardHeader className="d-flex border-bottom">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">Users</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add Users</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(3)} className="ml-2 pr-4">Add Multiple</button>
                                </div>
                            </CardHeader>

                            <CreateUser
                                firstName={firstName}
                                email={email}
                                password={password}
                                userName={userName}
                                expiry={expiry}
                                count={count}
                                setCount={setCount}
                                selected={selected}
                                setName={setName}
                                setUserName={setUserName}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                handleExpiry={handleExpiry}
                                createUser={createUser}
                            />
                            <Button theme="primary" onClick={() => selected === 1 ? createUser() : selected === 2 ? editUser("", true) : multiUser()} >Submit</Button>
                        </Card>
                    </Col>
                </Row>
                <Loader start={loader} />
            </Container>
        )
    }
    else {
        return (
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Customers" subtitle="TraceNow Users" className="text-sm-left" />
                </Row>

                {/* Default Light Table */}
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="d-flex border-bottom align-items-center">
                                <div className="mr-2">
                                    <FormInput className="pr-4" onChange={(e) => {
                                        searchData(e.target.value)
                                    }
                                    } placeholder="Text To Search" />
                                </div>
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">Users</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add Users</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(3)} className="ml-2 pr-4">Add Multiple</button>
                                </div>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                <table className="table mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th scope="col" className="border-0">
                                                #
                                            </th>
                                            <th scope="col" className="border-0">
                                                Name
                                            </th>
                                            <th scope="col" className="border-0">
                                                Username
                                            </th>
                                            <th scope="col" className="border-0">
                                                Email
                                            </th>
                                            <th scope="col" className="border-0">
                                                Password
                                            </th>
                                            <th scope="col" className="border-0">
                                                Expiry
                                            </th>
                                            <th scope="col" className="border-0">
                                                Visitor Id
                                            </th>
                                            <th scope="col" className="border-0">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data && data.length ?
                                                data.map((__, index) =>
                                                    <tr key={index}>
                                                        <td>
                                                            {page === 1 ? index + 1 : skip + index + 1}.
                                                        </td>
                                                        <td>
                                                            {__.firstName.slice(0, 26)}
                                                        </td>
                                                        <td>{__.userName}</td>
                                                        <td>{__.email || "N/A"}</td>
                                                        <td>
                                                            {__.password}
                                                        </td>
                                                        <td>
                                                            {__.expiry}
                                                        </td>
                                                        <td>
                                                            {__.visitorId}
                                                        </td>
                                                        <td>
                                                            <ActionButton
                                                                delete={deleteUser}
                                                                edit={editUser}
                                                                id={__._id}
                                                            />
                                                        </td>
                                                    </tr>
                                                ) : <tr></tr>
                                        }
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                        <Pagination
                            initialPage={page}
                            totalCount={totalCount}
                            onChangePage={PaginationHandler}
                        />
                    </Col>
                </Row>
                <Loader start={loader} />
            </Container>
        )
    }
};


Customers.defaultProps = {
    userDetails: {
        status: 1,
        name: "TraceNow",
        avatar: require("./../images/avatars/1.jpg"),
        jobTitle: "",
        performanceReportTitle: "Workload",
        performanceReportValue: 74,
        metaTitle: "Description",
        metaValue:
            "This app is designed to get the audience attention",
        startAt: "2022-02-02 03:30pm"
    }
};

export default Customers;
