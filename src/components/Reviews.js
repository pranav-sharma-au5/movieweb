import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

class Reviews extends Component {
    state = {}
    render() {
        let { reviews } = this.props
        return (<div className="row my-5 ">
            <h3 className="col-md-12">Reviews</h3>
            <div className="col-md-12 bg-details">
                {reviews.map(el =>
                    <div key={uuid()} className="column p-2">

                        <h6 >
                            {el.author}
                        </h6>

                        <p className=" review-text">
                            {el.content}
                        </p>

                    </div>
                )}
                {!reviews.length &&
                    <div className="col p-3 ">
                        No reviews yet!
        </div>
                }
            </div>
        </div>);
    }
}

export default Reviews;