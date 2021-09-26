import React from "react";
import { CardBody, Card, CardImg, CardTitle, CardText } from "reactstrap";

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
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>

                {
                    props.dish != null &&
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>

                        <RenderComment comments={props.dish.comments} />
                    </div>
                }
            </div>
        </div>
    );
}

export default DishDetail;