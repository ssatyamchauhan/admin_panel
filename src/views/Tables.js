import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import NewsEditor from "../components/add-news/NewsEditor";
import PublishDraftGroup from "../components/add-news/publisDraft";
import { DELETE_REQUEST, GET_REQUEST, PATCH_REQUEST, POST_REQUEST } from "../lib/request";
import Pagination from "../components";
import ActionButton from "../components/ActionButton";

const Tables = ({ userDetails }) => {

  const [selected, setSelected] = React.useState(0)
  const [status, setStatus] = React.useState(1);
  const [title, setTitle] = React.useState("");
  const [subTitle, setSubTitle] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [htmlText, setHtmlText] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(1);

  const [news, setNews] = React.useState([]);
  const [newsId, setNewsId] = React.useState("");
  const [totalCount, setTotalCount] = React.useState(0);

  const GET_NEWS = () => {
    GET_REQUEST("/news")
      .then((response) => {
        if (response && response.data && response.data.data) {
          setNews(response.data.data);
          response && response.data && response.data.totalCount ? setTotalCount(response.data.totalCount) : setTotalCount(0)
        }
      })
      .catch((error) => {
        console.log('Error in fetching data', error);
      })
  }

  React.useEffect(() => {
    if (!selected) {
      setHtmlText("")
      setTitle("")
      setSubTitle("")
      setImageUrl("")
      GET_NEWS()
    }
  }, [selected]);

  React.useEffect(() => {
    GET_REQUEST(`/news?skip=${(activeIndex - 1) * 10}`)
      .then((response) => {
        if (response && response.data && response.data.data) {
          setNews(response.data.data);
          response && response.data && response.data.totalCount ? setTotalCount(response.data.totalCount) : setTotalCount(0)
        }
      })
      .catch((error) => {
        console.log('Error in fetching data', error);
      })
  }, [activeIndex])

  const CreateNews = () => {
    if (!title || !subTitle || !imageUrl || !htmlText) {
      return;
    }
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var dateTime = date + ' ' + time;

    POST_REQUEST("/news", { news: { title, subTitle, imageUrl, status, htmlText, createdAt: dateTime } })
      .then((d) => {
        setSelected(0)
      }).catch((e) => {
        setSelected(1)
      })
  }

  const UpdateNews = () => {
    if (!title || !subTitle || !imageUrl || !htmlText || selected !== 2 || !newsId) {
      return;
    }
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var dateTime = date + ' ' + time;

    PATCH_REQUEST("/news", { newsId, news: { title, subTitle, imageUrl, status, htmlText, createdAt: dateTime } })
      .then((d) => {
        setSelected(0)
      }).catch((e) => {
        setSelected(1)
      })
  }


  const deleteNews = async (id) => {
    if (!news && !news.length || !id) {
      return;
    }
    const data = news.find((d) => d._id === id);
    if (!data) {
      return;
    }
    DELETE_REQUEST("/news", { newsId: data._id })
      .then((d) => {
        GET_NEWS()
      }).catch((e) => {
        console.error('Error while delete')
      })
  }

  const editNews = async (id) => {
    if (!news && !news.length || !id) {
      return;
    }
    const data = news.find((d) => d._id === id);
    if (!data) {
      return;
    }
    setNewsId(id)
    setHtmlText(data.htmlText)
    setTitle(data.title)
    setSubTitle(data.subTitle)
    setImageUrl(data.imageUrl)
    setSelected(2);
  }

  if (selected) {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="News Dashboard" subtitle="" className="text-sm-left" />
        </Row>

        <Row>
          {/* Editor */}
          <Col>
            <Card>
              <CardHeader className="d-flex border-bottom">
                <div>
                  <button onClick={() => setSelected(0)} className="mr-2 pr-4">News</button>
                </div>
                <div>
                  <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add News</button>
                </div>
              </CardHeader>
              <NewsEditor
                title={title}
                subTitle={subTitle}
                htmlText={htmlText}
                imageUrl={imageUrl}
                setTitle={setTitle}
                setSubTitle={setSubTitle}
                setImageUrl={setImageUrl}
                setHtmlText={setHtmlText}
              />
              <PublishDraftGroup status={status} onClick={setStatus} />
              <Button onClick={() => selected === 2 ? UpdateNews() : CreateNews()} theme="primary" >Submit</Button>

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
          <PageTitle sm="4" title="News Dashboard" subtitle="" className="text-sm-left" />
        </Row>

        {/* Default Light Table */}
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="d-flex border-bottom">
                <div>
                  <button onClick={() => setSelected(0)} className="mr-2 pr-4">News</button>
                </div>
                <div>
                  <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add News</button>
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
                        Image
                      </th>
                      <th scope="col" className="border-0">
                        Title
                      </th>
                      <th scope="col" className="border-0">
                        SubTitle
                      </th>
                      <th scope="col" className="border-0">
                        CreateAt
                      </th>
                      <th scope="col" className="border-0">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      news && news.length ?
                        news.map((data, index) =>
                          <tr key={index}>
                            <td>
                              {index + 1}.
                            </td>
                            <td>
                              <img
                                className="rounded-circle"
                                src={data.imageUrl}
                                alt={data.title}
                                width="60"
                                height="60"
                              />
                            </td>
                            <td>{data.title.slice(0, 30)}</td>
                            <td>{data.subTitle.slice(0, 30)}</td>
                            <td>{data.createdAt}</td>
                            <td>
                              <ActionButton
                                delete={deleteNews}
                                edit={editNews}
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


Tables.defaultProps = {
  userDetails: {
    name: "IPL Shikari",
    avatar: require("./../images/avatars/1.jpg"),
    jobTitle: "Web Developer",
    performanceReportTitle: "Workload",
    performanceReportValue: 74,
    metaTitle: "Description",
    metaValue:
      "This app is designed to get the audience attention"
  }
};

export default Tables;
