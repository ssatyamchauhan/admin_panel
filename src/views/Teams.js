import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import PublishDraftGroup from "../components/add-news/publisDraft";
import { DELETE_REQUEST, GET_REQUEST, PATCH_REQUEST, POST_REQUEST } from "../lib/request";
import Pagination from "../components";
import CreateTeam from "../components/customers/createUser";
import ActionButton from "../components/ActionButton";

const Teams = ({ userDetails }) => {

    const [totalCount, setTotalCount] = React.useState(0);
    const [selected, setSelected] = React.useState(0)
    const [status, setStatus] = React.useState(1);
    const [matchId, setMatchId] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [players, setPlayers] = React.useState("");
    const [activeIndex, setActiveIndex] = React.useState(1);

    const [teams, setTeams] = React.useState([]);

    const [teamId, setTeamId] = React.useState("");

    const GET_TEAMS = (endpoint) => {
        GET_REQUEST(endpoint)
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

    React.useEffect(() => {
        if (!selected) {
            setMatchId("");
            setTitle("")
            setPlayers("");
            GET_TEAMS("/teams");
        }
    }, [selected]);

    React.useEffect(() => {
        console.log('activeIndex', activeIndex)
        GET_REQUEST(`/teams?skip=${(activeIndex - 1) * 10}`)
            .then((response) => {
                if (response && response.data && response.data.data) {
                    setTeams(response.data.data);
                    response && response.data && response.data.totalCount ? setTotalCount(response.data.totalCount) : setTotalCount(0)
                }
            })
            .catch((error) => {
                console.log('Error in fetching data', error);
            })
    }, [activeIndex])

    const CreateNewTeam = () => {
        console.log(title, matchId, players)
        if (!title || !matchId || !players.length) {
            return;
        }
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var dateTime = date + ' ' + time;

        POST_REQUEST("/teams", { team: { status, matchId, title, players: players.split(","), createdAt: dateTime } })
            .then((d) => {
                setSelected(0)
            }).catch((e) => {
                setSelected(1)
            })
    }


    const UpdateTeam = () => {
        if (!title || !matchId || !players.length || !teamId || selected !== 2) {
            return;
        }
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var dateTime = date + ' ' + time;

        PATCH_REQUEST("/teams", { teamId, team: { status, matchId, title, players: players.split(","), createdAt: dateTime } })
            .then((d) => {
                setSelected(0)
            }).catch((e) => {
                setSelected(1)
            })
    }

    const deleteTeam = async (id) => {
        if (!teams && !teams.length) {
            return;
        }
        const team = teams.find((d) => d._id === id);
        if (!team) {
            return;
        }
        DELETE_REQUEST("/teams", { teamId: team._id })
            .then((d) => {
                GET_TEAMS("/teams")
            }).catch((e) => {
                console.error('Error while delete')
            })
    }

    const editTeam = async (id) => {
        if (!teams && !teams.length) {
            return;
        }
        const team = teams.find((d) => d._id === id);
        if (!team) {
            return;
        }
        setTeamId(id)
        setMatchId(team.matchId);
        setTitle(team.title)
        setPlayers(team.players.toString());
        setSelected(2);
    }

    if (selected) {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Plyaing 11" subtitle="" className="text-sm-left" />
                </Row>

                <Row>
                    {/* Editor */}
                    <Col>
                        <Card>
                            <CardHeader className="d-flex border-bottom">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">Teams</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add Team</button>
                                </div>
                            </CardHeader>

                            <CreateTeam
                                title={title}
                                matchId={matchId}
                                players={players}
                                setTitle={setTitle}
                                setMatchId={setMatchId}
                                setPlayers={setPlayers}
                            />
                            <PublishDraftGroup status={status} onClick={setStatus} />
                            <Button onClick={() => selected === 2 ? UpdateTeam() : CreateNewTeam()} theme="primary" >Submit</Button>

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
                    <PageTitle sm="4" title="Playing 11" subtitle="" className="text-sm-left" />
                </Row>

                {/* Default Light Table */}
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="d-flex border-bottom">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">Team</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add Team</button>
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
                                                Team Title
                                            </th>
                                            <th scope="col" className="border-0">
                                                Created At
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
                                            teams && teams.length ?
                                                teams.map((data, index) =>
                                                    <tr key={index}>
                                                        <td>
                                                            {index + 1}.
                                                        </td>
                                                        <td>
                                                            {data.matchId}
                                                        </td>
                                                        <td>{data.title.slice(0, 30)}</td>
                                                        <td>
                                                            {data.createdAt}
                                                        </td>
                                                        <td>
                                                            <ActionButton
                                                                delete={deleteTeam}
                                                                edit={editTeam}
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


Teams.defaultProps = {
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

export default Teams;
