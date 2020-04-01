import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import { getDetails, fetchingData } from "../actions/actions";

class MoviePoster extends Component {
    state = {
        liked: false
    }

    handleLike(e) {
        e.preventDefault()
        e.stopPropagation()
        this.setState((prevState) => { return { liked: !prevState.liked } })
    }
    handleClick(tab, id) {
        this.props.fetchingData()
        this.props.getDetails(tab, id)
    }

    render() {
        const { video } = this.props
        const videoName = video.title || video.name
        const link = video.title ? "movies" : "tvshows"
        const tab = video.title ? "movie" : "tv"
        return (< div className="col-2  thumbnail">
            <Link
                onClick={() => this.handleClick(tab, video.id)}
                to={`/${link}/${videoName.replace(/\s/g, "-").toLowerCase()}/${video.id}`}>

                <img className="poster" src={`http://image.tmdb.org/t/p/w342/${video.poster_path}`} alt="" />

                <p className="d-none title text-white">
                    {videoName}
                </p>
                <i onClick={(e) => this.handleLike(e)} className={"fa fa-heart " + (this.state.liked ? "liked" : "unliked")}></i>
                <i className="fa fa-star"> <span className="text-white">{video.vote_average}</span></i>
            </Link>

        </div>)
    }
}

let mapState = (state) => state


let mapProps = (dispatch) => {
    return bindActionCreators({ getDetails, fetchingData }, dispatch)
}
export default connect(mapState, mapProps)(MoviePoster);






