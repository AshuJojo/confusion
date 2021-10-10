import React, { Component } from 'react';
import {
    CardBody, Card, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Col, FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';

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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentForm() {
        this.setState({
            isCommentFormOpen: !this.state.isCommentFormOpen,
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        }); 
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    validate(author){
        const errors = {
            author: ''
        };

        if(this.state.touched.author && author.length < 2)
            errors.author = 'Must be greater than 2 characters';
        else if(this.state.touched.name && author.length > 15)
            errors.author = 'Must be less than 15 characters';


        return errors;
    }

    render() {
        const errors = this.validate(this.state.author);

        return (
            <div>
                <Button outline onClick={this.toggleCommentForm}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isCommentFormOpen} toggle={this.toggleCommentForm}>
                    <ModalHeader toggle={this.toggleCommentForm}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Input type="select" name="rating" className="form-control"
                                        value={this.state.rating} onChange={this.handleInputChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="author" className="form-label">Your Name</Label>
                                <Col md={12}>
                                    <Input type="text" name="author" className="form-control" placeholder="Your Name"
                                        value={this.state.name} onChange={this.handleInputChange}
                                        onBlur={this.handleBlur('author')} invalid={errors.author !== ''}/>
                                    <FormFeedback>{errors.author}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="comment" className="form-label">Comment</Label>
                                <Col md={12}>
                                    <Input type="textarea" name="comment" rows="6" className="form-control"
                                        value={this.state.comment} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>

                            <Button type="submit" color="primary">Submit</Button>

                        </Form>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

//Rendering Dishes
function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg src={dish.image} alt={dish.name} />
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
function RenderComment({ comments }) {
    if (comments != null) {
        return (
            <div>
                {comments.map((comment) => (
                    <div key={comment.key}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        return <div></div>;
    }
}

const DishDetail = (props) => {
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
                        <RenderComment comments={props.comments} />

                        <CommentForm />
                    </div>
                }
            </div>
        </div>
    );
}

export default DishDetail;
