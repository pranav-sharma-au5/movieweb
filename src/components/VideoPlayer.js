import React, { Component } from 'react';
import Draggable from 'react-draggable';

class VideoPlayer extends Component {
    state = {}
    render() {
        return (
            <div className="row my-3">
                <Draggable position={{ x: "50%", y: "50%" }} handle=".handle">
                    {/* <h3 className="col-md-12"> Trailer</h3> */}
                    <div className="handle posterImage  " >
                        <div className="iframe-container">

                            <iframe title="player" id="trailer" width="700" height="450" src={`https://www.youtube.com/embed/${this.props.trailer}`} frameBorder="0">
                            </iframe>
                            <i onClick={() => this.props.toggleTrailer()} className="fa fa-close close-trailer  "></i>
                            <i className="fa fa-window-restore"></i>
                        </div>

                    </div>
                </Draggable>
            </div>
        )
    }
}

export default VideoPlayer;