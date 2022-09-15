import React from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    FormInput,
    FormSelect,
    FormTextarea,
} from "shards-react";

const CreateNews = ({ header, category, categoryId, setCategoryId, title, setTitle, description, setDescription, content, setContent, url, setUrl, image, onImageChange }) => {

    const SelectCategory = (name, setCategoryId) => {
        const catInfo = category.find((cat) => cat.name === name);
        if (catInfo && catInfo._id) {
            setCategoryId(catInfo._id);
        }
    }
    console.log('caegory', category)
    return (
        <Card small className="h-100">
            {/* Card Header */}
            <CardHeader className="border-bottom">
                <h6 className="m-0">{header}</h6>
            </CardHeader>

            <CardBody className="d-flex flex-column">
                <Form>
                    {/* Category */}
                    <label htmlFor="feInputState">Select Category</label>
                    <FormSelect onChange={(event) => SelectCategory(event.target.value, setCategoryId)} id="feInputState">
                        <option>Choose ...</option>
                        {
                            category && category.length && category.map((cat, i) => (
                                <option selected={categoryId === cat._id} key={i} id={cat._id}>{cat.name}</option>
                            ))
                        }
                    </FormSelect>
                    {/* Title */}
                    <FormGroup>
                        <label htmlFor="feInputState">Title</label>
                        <FormInput value={title} onChange={(e) => setTitle(e.target.value)} id="feInputState" placeholder="Enter News Title" />
                    </FormGroup>
                    {/* Description */}
                    <FormGroup>
                        <label htmlFor="feInputState">Description</label>
                        <FormTextarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} id="feInputState" placeholder="Enter News Description" />
                    </FormGroup>
                    {/* content */}
                    {/* <FormGroup>
                        <label htmlFor="feInputState">Content</label>
                        <FormInput value={content} onChange={(e) => setContent(e.target.value)} id="feInputState" placeholder="Enter News Content" />
                    </FormGroup> */}
                    {/* url */}
                    <FormGroup>
                        <label htmlFor="feInputState">News Url</label>
                        <FormInput value={url} onChange={(e) => setUrl(e.target.value)} id="feInputState" placeholder="Enter News Url" />
                    </FormGroup>

                    {/* Image */}
                    <FormGroup>

                        <label htmlFor="feInputState">Image</label>
                        {
                            image ?
                                <div className="mb-3 mx-auto">
                                    <img
                                        className="rounded-circle"
                                        src={image}
                                        alt={`${title}_image`}
                                        width="110"
                                    />
                                </div>
                                : <></>
                        }
                        <FormInput type="file" name="image" onChange={onImageChange} id="feInputState" />
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    );
}

CreateNews.propTypes = {
    /**
     * The component's title.
     */
    header: PropTypes.string
};

CreateNews.defaultProps = {
    header: "ADD News"
};

export default CreateNews;