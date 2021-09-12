import React, { Component } from "react";
import { CardBody, Card, CardImg, CardTitle, CardText } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  //Rendering Dishes
  renderDish(dish) {
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
  renderComment(dish) {
    if (dish.comments != null) {
        return (
            <div>
                {dish.comments.map((comment) => (
                    <div key={comment.key}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {comment.date}</p>
                    </div>
                ))}
            </div>
        );
    } else {
      return <div></div>;
    }
  }

  //Render Dishes and Comments with the help of renderDish() and renderComment() method
  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>  

          {this.renderComment(this.props.selectedDish)}
        </div>
      </div>
    );
  }
}

export default DishDetail;
