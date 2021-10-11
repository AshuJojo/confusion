import React, { Component } from 'react';
import {
    CardBody, Card, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Row, Col, Label
} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxlength = (len) => (val) => !(val) || (val.length <= len);
const minlength = (len) => (val) => val && (val.length >= len);

//Rendering Dishes
function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    } else {
        return <div></div>;
    }
}

//Rendering Comments
function RenderComment({ comments, postComment, dishId }) {
    if (comments != null) {
        return (
            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                ))}

                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    } else {
        return <div></div>;
    }
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentFormOpen: false,
            rating: '1',
            author: '',
            comment: '',
            touched: {
                author: false
            }
        };

        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentForm() {
        this.setState({
            isCommentFormOpen: !this.state.isCommentFormOpen,
        });
    }

    handleSubmit(values) {
        this.toggleCommentForm();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleCommentForm}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isCommentFormOpen} toggle={this.toggleCommentForm}>
                    <ModalHeader toggle={this.toggleCommentForm}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author" className="form-label">Your Name</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.text model=".author" name="author" className="form-control" placeholder="Your Name"
                                        validators={
                                            minlength(2), maxlength(15)
                                        } />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{
                                            minlength: 'Must be greater than 2 characters',
                                            maxlength: 'Must be less than 15 characters'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment" className="form-label">Comment</Label>
                                </Col>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment" rows="6" className="form-control" />
                                </Col>
                            </Row>

                            <Button type="submit" color="primary">Submit</Button>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}


const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if(props.dish != null){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>

                    {
                        props.dish != null &&
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComment comments={props.comments} postComment={props.postComment} dishId={props.dish.id} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default DishDetail;
