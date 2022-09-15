import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import PublishDraftGroup from "../components/add-news/publisDraft";
import { DELETE_REQUEST, GET_REQUEST, PATCH_REQUEST, POST_REQUEST } from "../lib/request";
import Pagination from "../components";
import CreateNewMatch from "../components/cricket/newMatch";
import ActionButton from "../components/ActionButton";

const Cricket = ({ userDetails }) => {

    const [teams, setTeams] = React.useState([]);
    const [totalCount, setTotalCount] = React.useState(0);
    const [selected, setSelected] = React.useState(0)
    const [status, setStatus] = React.useState(1);
    const [teamA, setTeamA] = React.useState("");
    const [teamB, setTeamB] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [matchUrl, setMatchUrl] = React.useState("");
    const [startAt, setStartAt] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(1);

    const [matchId, setMatchId] = React.useState("");

    const [matches, setMatches] = React.useState([]);

    const GET_MATCHES = (endpoint) => {
        GET_REQUEST(endpoint)
            .then((response) => {
                if (response && response.data && response.data.data) {
                    setMatches(response.data.data);
                    // setTotalCount(response.data.totalCount)
                }
            })
            .catch((error) => {
                console.log('Error in fetching data', error);
            })
    }

    React.useEffect(() => {
        if (!selected) {
            setTeamA("")
            setTeamB("")
            setTitle("")
            setMatchUrl("")
            setStartAt("")
            GET_MATCHES("/matches");
            if (!teams.length) {
                GET_REQUEST("/ipl-teams")
                    .then((response) => {
                        if (response && response.data && response.data.data) {
                            setTeams(response.data.data);
                            response && response.data && response.data.totalCount ? setTotalCount(response.data.totalCount) : setTotalCount(0)
                        }
                    })
                    .catch((error) => {
                        console.log('Error in fetching data', error);
                    })
            }
        }
    }, [selected]);

    React.useEffect(() => {
        GET_REQUEST(`/matches?skip=${(activeIndex - 1) * 10}`)
            .then((response) => {
                if (response && response.data && response.data.data) {
                    setMatches(response.data.data);
                    response && response.data && response.data.totalCount ? setTotalCount(response.data.totalCount) : setTotalCount(0)
                }
            })
            .catch((error) => {
                console.log('Error in fetching data', error);
            })
    }, [activeIndex])


    const CreateMatches = () => {
        if (!title || !startAt || !teamA || !teamB) {
            return;
        }
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var dateTime = date + ' ' + time;

        POST_REQUEST("/matches", { match: { status, teamA, teamB, title, matchUrl, startAt, createdAt: dateTime } })
            .then((d) => {
                setSelected(0)
            }).catch((e) => {
                setSelected(1)
            })
    }

    const UpdateMatches = () => {
        if (!title || !startAt || !teamA || !teamB || selected !== 2 || !matchId) {
            return;
        }
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var dateTime = date + ' ' + time;

        PATCH_REQUEST("/matches", { matchId, match: { status, teamA, teamB, title, matchUrl, startAt, createdAt: dateTime } })
            .then((d) => {
                setSelected(0)
            }).catch((e) => {
                setSelected(1)
            })
    }

    const deleteMatch = async (id) => {
        if (!matches && !matches.length) {
            return;
        }
        const match = matches.find((d) => d._id === id);
        if (!match) {
            return;
        }
        DELETE_REQUEST("/matches", { matchId: match._id })
            .then((d) => {
                GET_MATCHES("/matches")
            }).catch((e) => {
                console.error('Error while delete')
            })
    }

    const editMatch = async (id) => {
        if (!matches && !matches.length) {
            return;
        }
        const match = matches.find((d) => d._id === id);
        if (!match) {
            return;
        }
        setMatchId(id);
        setTeamA(match.teamA)
        setTeamB(match.teamB)
        setTitle(match.title)
        setMatchUrl(match.matchUrl)
        setStartAt(match.startAt)
        setSelected(2);
    }

    if (selected) {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Cricket Dashboard" subtitle="" className="text-sm-left" />
                </Row>

                <Row>
                    {/* Editor */}
                    <Col>
                        <Card>
                            <CardHeader className="d-flex border-bottom">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">Matches</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add Match</button>
                                </div>
                            </CardHeader>
                            <CreateNewMatch
                                teams={teams}
                                teamA={teamA}
                                teamB={teamB}
                                setTeamA={setTeamA}
                                setTeamB={setTeamB}
                                title={title}
                                startAt={startAt}
                                matchUrl={matchUrl}
                                setMatchUrl={setMatchUrl}
                                setTitle={setTitle}
                                setStartAt={setStartAt}
                            />
                            <PublishDraftGroup status={status} onClick={setStatus} />
                            <Button onClick={() => selected === 2 ? UpdateMatches() : CreateMatches()} theme="primary" >Submit</Button>

                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
    else {
        return (
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Cricket Dashboard" subtitle="" className="text-sm-left" />
                </Row>

                {/* Default Light Table */}
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="d-flex border-bottom">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">Matches</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add Match</button>
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
                                                Match Id
                                            </th>
                                            <th scope="col" className="border-0">
                                                Team A
                                            </th>
                                            <th scope="col" className="border-0">
                                                Title
                                            </th>
                                            <th scope="col" className="border-0">
                                                Team B
                                            </th>
                                            <th scope="col" className="border-0">
                                                Match Url
                                            </th>
                                            <th scope="col" className="border-0">
                                                Start At
                                            </th>
                                            <th scope="col" className="border-0">
                                                Actions
                                            </th>
                                            <th scope="col" className="border-0">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            matches && matches.length ?
                                                matches.map((data, index) =>
                                                    <tr key={index}>
                                                        <td>
                                                            {index + 1}.
                                                        </td>
                                                        <td>
                                                            {data._id}
                                                        </td>
                                                        <td>
                                                            <img
                                                                className="rounded-circle"
                                                                src={data.teamA}
                                                                alt={data.title}
                                                                width="60"
                                                                height="60"
                                                            />
                                                        </td>
                                                        <td>{data.title.slice(0, 30)}</td>
                                                        <td>
                                                            <img
                                                                className="rounded-circle"
                                                                src={data.teamB}
                                                                alt={data.title}
                                                                width="60"
                                                                height="60"
                                                            />
                                                        </td>
                                                        <td>{data && data.matchUrl ? data.matchUrl.slice(0, 30) : "NA"}</td>
                                                        <td>{data.startAt}</td>
                                                        <td>
                                                            <ActionButton
                                                                delete={deleteMatch}
                                                                edit={editMatch}
                                                                id={data._id}
                                                            />
                                                        </td>
                                                        <td>
                                                            <PublishDraftGroup status={data.status} disabled={true} />
                                                        </td>
                                                    </tr>
                                                ) : <tr></tr>
                                        }
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                        <Pagination totalCount={totalCount} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    </Col>
                </Row>
            </Container>
        )
    }
};


Cricket.defaultProps = {
    userDetails: {
        status: 1,
        name: "IPL Shikari",
        avatar: require("./../images/avatars/1.jpg"),
        jobTitle: "CSK VS KKR",
        performanceReportTitle: "Workload",
        performanceReportValue: 74,
        metaTitle: "Description",
        metaValue:
            "This app is designed to get the audience attention",
        startAt: "2022-02-02 03:30pm"
    }
};

export default Cricket;
