import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { DELETE_REQUEST, GET_REQUEST, PATCH_REQUEST, POST_REQUEST } from "../lib/request";
import ActionButton from "../components/ActionButton";
import CreateCategory from "../components/category/createCategory";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import Pagination from "../components";

const Category = () => {

    const [selected, setSelected] = React.useState(0)
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [loader, setLoader] = React.useState(0);
    const [imageBinary, setImageBinary] = React.useState(null);
    const [categoryId, setCategoryId] = React.useState("");
    const [category, setCategory] = React.useState([]);
    const [skip, setSkip] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [totalCount, setTotalResults] = React.useState(0);

    const GET_CATEGORY = () => {
        setLoader(1)
        GET_REQUEST("/category?limit=10&asc=1&skip=" + skip)
            .then((response) => {
                if (response && response.data && response.data.category) {
                    setCategory(response.data.category);
                    setTotalResults(response.data.totalResults);
                }
                if (response.status === 204) {
                    setCategory([]);
                }
                setLoader(0)
            })
            .catch((error) => {
                console.log('Error in fetching data', error);
                setLoader(0)
            })
    }

    React.useEffect(() => {
        if (!selected) {
            GET_CATEGORY()
            setCategoryId("");
            setName("");
            setImage("");
        }
    }, [selected]);

    const CreateNewCategory = () => {
        if (!name || !image) {
            toast.error("Name and image are manadatory!")
        }
        setLoader(1)
        const formData = new FormData();
        formData.append('image', imageBinary);
        POST_REQUEST("/upload", formData).then((response) => {
            if (response.status === 201) {
                if (response.data && response.data.path && response.data.path.filename) {
                    POST_REQUEST("/category", { category: { status: 1, name, image: response.data.path.filename, imageUrl: response.data.imageUrl } })
                        .then((d) => {
                            toast.success("Category Created Successfully!");
                            GET_CATEGORY()
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
        if (!name || !image || selected !== 2 || !categoryId) {
            toast.error("name and image are manadatory field!")
            return;
        }
        setLoader(1);
        let categoryData = { name }
        if (imageBinary) {
            const formData = new FormData();
            formData.append("image", imageBinary);
            await POST_REQUEST("/upload", formData).then((response) => {
                if (response.data && response.data.path && response.data.path.filename) {
                    categoryData.image = response.data.path.filename;
                    categoryData.imageUrl = response.data.imageUrl
                }
            })
                .catch((error) => {
                    toast.error("Failed to upload new image");
                    setLoader(0);
                    return;
                })
        }
        PATCH_REQUEST("/category", { categoryId, category: categoryData })
            .then((d) => {
                toast.success("Category Updated Successfully!")
                GET_CATEGORY()
                setSelected(0)
            }).catch((e) => {
                setSelected(1)
            })
        setLoader(0)
    }

    const deleteCategory = async (id) => {
        if (!category && !category.length) {
            return;
        }
        const catData = category.find((d) => d._id === id);
        if (!catData) {
            toast.error("No Such Category!");
            return;
        }
        setLoader(1)
        DELETE_REQUEST("/category", { categoryId: id })
            .then((d) => {
                toast.success("Category Deleted Successfully!");
                setLoader(0);
                GET_CATEGORY()
            }).catch((e) => {
                setLoader(0);
                console.error('Error while delete')
            })
    }


    const editCategory = async (id) => {
        if (!category && !category.length) {
            return;
        }
        const catData = category.find((d) => d._id === id);
        if (!catData) {
            toast.success("No Such Category Found!")
            return;
        }
        setCategoryId(id);
        setName(catData.name);
        setImage(catData.imageUrl);
        setSelected(2);
    }

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImageBinary(img);
            setImage(URL.createObjectURL(img))
        }
    };

    const PaginationHandler = (data) => {
        setSkip((data - 1) * 10);
        setPage(data);
        // const skip = (data - 1) * 10
    }

    React.useEffect(() => {
        GET_CATEGORY()
    }, [skip])

    if (selected) {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                {/* Page Header */}
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="PRONEWS CATEGORY" subtitle="" className="text-sm-left" />
                </Row>

                <Row>
                    {/* Editor */}
                    <Col>
                        <Card>
                            <CardHeader className="d-flex border-bottom">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">Categories</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Create Category</button>
                                </div>
                            </CardHeader>
                            <CreateCategory
                                setName={setName}
                                name={name}
                                image={image}
                                onImageChange={onImageChange}
                            />
                            {/* <PublishDraftGroup status={status} onClick={setStatus} /> */}
                            <Button onClick={() => selected === 2 ? UpdateCategory() : CreateNewCategory()} theme="primary" >Submit</Button>
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
                    <PageTitle sm="4" title="PRONEWS CATEGORY" subtitle="" className="text-sm-left" />
                </Row>

                {/* Default Light Table */}
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="d-flex border-bottom">
                                <div>
                                    <button onClick={() => setSelected(0)} className="mr-2 pr-4">Categories</button>
                                </div>
                                <div>
                                    <button onClick={() => setSelected(1)} className="ml-2 pr-4">Create Category</button>
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
                                                Category Name
                                            </th>
                                            <th scope="col" className="border-0">
                                                Created At
                                            </th>
                                            <th scope="col" className="border-0">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            category && category.length ?
                                                category.map((data, index) =>
                                                    <tr key={index}>
                                                        <td>
                                                            {(page - 1) * 10 + index + 1}.
                                                        </td>
                                                        <td>
                                                            <img
                                                                className="rounded-circle"
                                                                src={data.imageUrl}
                                                                alt={data.name}
                                                                width="60"
                                                                height="40"
                                                            />
                                                        </td>
                                                        <td>{data.name}</td>
                                                        <td>
                                                            {new Date(data.createdAt).toDateString()}
                                                        </td>
                                                        <td>
                                                            <ActionButton
                                                                delete={deleteCategory}
                                                                edit={editCategory}
                                                                id={data._id}
                                                            />
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
    }
};

export default Category;
