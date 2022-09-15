import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { DELETE_REQUEST, GET_REQUEST, PATCH_REQUEST, POST_REQUEST } from "../lib/request";
import ActionButton from "../components/ActionButton";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { Constants } from "../flux";
import CreateNews from "../components/news/CreateNews";
import PublishDraftGroup from "../components/common/PublishedDraft";
import Pagination from "../components/index";
import PopUpImage from "../components/popupModal/imageModal";
import CustomFormSelect from "../components/common/Select";

const News = () => {

    const [selected, setSelected] = React.useState(0)
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [news, setNews] = React.useState([]);
    const [content, setContent] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [loader, setLoader] = React.useState(0);
    const [imageBinary, setImageBinary] = React.useState(null);
    const [categoryId, setCategoryId] = React.useState("");
    const [category, setCategory] = React.useState([]);
    const [status, setStatus] = React.useState(1);
    const [newsId, setNewsId] = React.useState("");
    const [skip, setSkip] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [totalCount, setTotalResults] = React.useState(0);
    const [selectedImage, setSelectedImage] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);

    const GET_NEWS = () => {
        setLoader(1)
        GET_REQUEST(`/news?isAdmin=true&categoryId=${selectedCategoryId === "All" || !selectedCategoryId ? "" : selectedCategoryId}&id=lkjasdflkj&limit=10&skip=` + skip)
            .then((response) => {
                if (response && response.data && response.data.articles) {
                    setNews(response.data.articles);
                    setTotalResults(response.data.totalResults);
                }
                if (response.status === 204) {
                    setNews([]);
                    setTotalResults(0)
                }
                setLoader(0)
            })
            .catch((error) => {
                toast.error("Failed to Fetch Categories")
                console.log('Error in fetching data', error);
                setLoader(0)
            })
    }
    const GET_CATEGORY = () => {
        GET_REQUEST("/category")
            .then((response) => {
                if (response && response.data && response.data.category) {
                    setCategory(response.data.category);
                }
                if (response.status === 204) {
                    console.log('l202')
                    setCategory([]);
                }
            })
            .catch((error) => {
                console.log('Error in fetching data', error);
            })
    }

    React.useEffect(() => {
        if (category.length === 0) {
            GET_CATEGORY()
        }
    }, [selected])

    React.useEffect(() => {
        if (!selected) {
            GET_NEWS()
            setNewsId("");
            setTitle("");
            setDescription("");
            setContent("");
            setUrl("");
            setCategoryId("");
            setImage("");
            setStatus(1);
        }
    }, [selected]);

    const AddNews = () => {
        if (!categoryId) {
            toast.error("Select a Category First");
            return;
        }
        if (!title || !description || !url || !imageBinary) {
            toast.error("title, description, url and image are manadatory!");
            return;
        }
        setLoader(1)
        const formData = new FormData();
        formData.append('image', imageBinary);
        POST_REQUEST("/upload", formData).then((response) => {
            if (response.status === 201) {
                if (response.data && response.data.path && response.data.path.filename) {
                    POST_REQUEST("/news", {
                        news: {
                            status: status,
                            "source": {
                                "id": "",
                                "name": ""
                            },
                            "author": "",
                            categoryId,
                            title,
                            description,
                            url,
                            urlToImage: response.data.path.filename,
                            imageUrl: response.data.imageUrl
                        }
                    })
                        .then((d) => {
                            toast.success("News Created Successfully!");
                            GET_NEWS()
                            setSelected(0)
                        }).catch((e) => {
                            setSelected(1)
                        })
                }
            }
            setLoader(0);
        }).catch((error) => {
            console.error('Error While Uploading Image', error);
            setLoader(1)
            toast.error("Error While Uploading Image");
        })
    }

    const UpdateCategory = async () => {
        if (!title || !description || selected !== 2 || !categoryId || !url) {
            toast.error("title, description, categoryId, url and image are manadatory field!")
            return;
        }
        setLoader(1);
        let newsData = { title, description, url, status, categoryId }
        if (imageBinary) {
            const formData = new FormData();
            formData.append("image", imageBinary);
            await POST_REQUEST("/upload", formData).then((response) => {
                if (response.data && response.data.path && response.data.path.filename) {
                    newsData.urlToImage = response.data.path.filename;
                    newsData.imageUrl = response.data.imageUrl
                }
            })
                .catch((error) => {
                    toast.error("Failed to upload news image");
                    setLoader(0);
                    return;
                })
        }
        PATCH_REQUEST("/news", { newsId, news: newsData })
            .then((d) => {
                toast.success("News Updated Successfully!")
                GET_NEWS()
                setSelected(0)
            }).catch((e) => {
                setSelected(1)
            })
        setLoader(0);
    }

    const deleteNews = async (id) => {
        if (!news && !news.length) {
            return;
        }
        const newsdata = news.find((d) => d._id === id);
        if (!newsdata) {
            toast.error("No Such News!");
            return;
        }
        setLoader(1)
        DELETE_REQUEST("/news", { newsId: id })
            .then((d) => {
                toast.success("News Deleted Successfully!");
                setLoader(0);
                GET_NEWS();
            }).catch((e) => {
                setLoader(0);
                console.error('Error while deleting News')
            })
    }


    const editNews = async (id) => {
        if (!news && !news.length) {
            return;
        }
        const newsData = news.find((d) => d._id === id);
        if (!newsData) {
            toast.success("No Such News Found!")
            return;
        }
        setNewsId(id);
        setTitle(newsData.title);
        setDescription(newsData.description);
        setContent(newsData.content);
        setUrl(newsData.url);
        setCategoryId(newsData.categoryId);
        setStatus(newsData.status)
        setImage(Constants.IMAGE_URL + "/" + newsData.urlToImage);

        setSelected(2);
    }

    const onImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImageBinary(img);
            setImage(URL.createObjectURL(img))
        }
    };

    const PaginationHandler = (data) => {
        setSkip((data - 1) * 10);
        setPage(data);
        const skip = (data - 1) * 10
    }

    React.useEffect(() => {
        GET_NEWS()
    }, [skip, selectedCategoryId])


    const onImageClick = (imageUrl) => {
        console.log('image clicked', imageUrl)
        setSelectedImage(imageUrl);
        setShowModal(true);
    }

    if (selected) {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="PRO NEWS" subtitle="" className="text-sm-left" />
                </Row>

                <Row>
                    {/* Editor */}
                    <Col>
                        <Card>
                            <CardHeader className="d-flex border-bottom active">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">News</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Add News</button>
                                </div>
                            </CardHeader>
                            <CreateNews
                                category={category}
                                categoryId={categoryId}
                                setCategoryId={setCategoryId}
                                title={title}
                                setTitle={setTitle}
                                description={description}
                                setDescription={setDescription}
                                content={content}
                                setContent={setContent}
                                url={url}
                                setUrl={setUrl}
                                image={image}
                                onImageChange={onImageChange}
                            />
                            <PublishDraftGroup status={status} onClick={setStatus} />
                            <Button onClick={() => selected === 2 ? UpdateCategory() : AddNews()} theme="primary" >Submit</Button>
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
                    <PageTitle sm="4" title="PRO NEWS" subtitle="" className="text-sm-left" />
                </Row>

                {/* Default Light Table */}
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="d-flex flex-wrap border-bottom">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4 h-100">News</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4 h-100">Add News</button>
                                </div>
                                <div className="ml-4">
                                    <CustomFormSelect category={category} setSelectedCategoryId={setSelectedCategoryId} selectedCategoryId={selectedCategoryId} />
                                </div>
                            </CardHeader>
                            <CardBody className="p-0 pb-3 table-responsive-md">
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
                                                Description
                                            </th>
                                            <th scope="col" className="border-0">
                                                News Source
                                            </th>
                                            <th scope="col" className="border-0">
                                                Created At
                                            </th>
                                            <th scope="col" className="border-0">
                                                Status
                                            </th>
                                            <th scope="col" className="border-0">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            news && news.length ?
                                                news.map((data, index) =>
                                                    <tr key={index}>
                                                        <td>
                                                            {(page - 1) * 10 + index + 1}.
                                                        </td>
                                                        <td role="button">
                                                            <img
                                                                // className=""
                                                                src={data.imageUrl}
                                                                alt={data.title}
                                                                width="60"
                                                                onClick={() => onImageClick(data.imageUrl)}
                                                                height="40"
                                                            />
                                                        </td>
                                                        <td>{data.title.slice(0, 25)}</td>
                                                        <td>{data.description.slice(0, 25)}</td>
                                                        <td>{data.url.slice(0, 25)}</td>
                                                        <td>
                                                            {new Date(data.createdAt).toDateString()}
                                                        </td>
                                                        <td>
                                                            <PublishDraftGroup status={data.status} disabled={true} />
                                                        </td>
                                                        <td>
                                                            <ActionButton
                                                                delete={deleteNews}
                                                                edit={editNews}
                                                                id={data._id}
                                                            />
                                                        </td>
                                                    </tr>
                                                ) : <tr></tr>
                                        }
                                    </tbody>
                                </table>
                            </CardBody>
                            <PopUpImage image={selectedImage || ""} showModal={showModal} setShowModal={setShowModal} />
                        </Card>
                        <Row noGutters className="d-flex justify-content-between">
                            {totalCount && totalCount > 10 ? <Pagination
                                initialPage={page}
                                totalCount={totalCount}
                                onChangePage={PaginationHandler}
                            /> : <></>}
                            <PageTitle sm="4" title={totalCount || ""} subtitle="" className={`d-flex justify-content-${totalCount && totalCount > 10 ? "end" : "start"} text-sm-right`} />
                        </Row>
                    </Col>
                </Row>
                <Loader start={loader} />
            </Container>
        )
    }
};

export default News;
