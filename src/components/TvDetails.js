import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import { getVideos, getDetails, fetchingData, getTorrentLinks } from "../actions/actions";
import "./Details.css"
import MoviePoster from "./MoviePoster";
import Reviews from "./Reviews";
import VideoPlayer from "./VideoPlayer";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import TTable from "./torrentsTable";

const api_key = '71e17cf532242a8619c4f89f2b8c3cb5'

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = { trailer: '' }
    }


    goToTrailer() {
        window.scrollTo(0, document.body.scrollHeight)
    }



    componentDidMount() {
        let { video, fetching, getTorrentLinks } = this.props
        const { tvId, tv } = this.props.match.params
        const id = tvId
        const tab = "tv"
        //don't have the video and it is not getting fetched then make request
        if (!(fetching || video)) {
            //set flag to indicate data fetching
            this.props.fetchingData()
            this.props.getDetails(tab, id)
        }
        getTorrentLinks(tv.replace(/-/g, "+"))

        window.scrollTo(0, 0)
        let url = `https://api.themoviedb.org/3/${tab}/${id}/videos?api_key=${api_key}&language=en-US`

        axios.get(url).then(videosData => {
            let trailer = videosData.data.results[0] || { type: undefined }
            if (trailer.type === "Trailer") {
                this.setState({ trailer: trailer.key })
            }
        })
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.componentDidMount()
        }
    }



    render() {
        let { video, fetching, torrents } = this.props
        console.log(video)
        let title = video.name
        let release = video.first_air_date
        let runtime = video.episode_run_time
        let { cast } = video
        let creator
        if (video) {
            creator = video.created_by
            cast = cast.slice(0, 5).map(el => el.name).join(", ")
        }
        document.documentElement.style.setProperty("--final", (140 - (140 * parseInt(video.vote_average)) / 10))
        if (video && !fetching)
            return (
                <div className="mx-4">

                    <div className="mx-3" >
                        <div className="row">
                            {/* Poster Image */}
                            <div className="col-md-4">
                                <img className="posterImage" width="85%" src={`http://image.tmdb.org/t/p/original/${video.poster_path}`} alt="" />
                            </div>

                            {/* Movie Details */}
                            <div className="col-md-7 bg-details p-3 posterImage rounded">
                                <div className="percent float-left mr-2">
                                    <svg>
                                        <circle cx="1.6rem" cy="1.6rem" r="1.4rem" />
                                        <circle cx="1.6rem" cy="1.6rem" r="1.4rem" style={{ stroke: getColor(video.vote_average) }} />
                                        {/* <circle cx="1.6rem" cy="1.6rem" r="1.4rem"
                                            style={{ strokeDashoffset: (140 - (140 * parseInt(video.vote_average)) / 10) }} /> */}
                                    </svg>
                                    <div className="number">
                                        <p>{video.vote_average * 10} <span>%</span></p>
                                    </div>
                                </div>

                                <h2 > {title} <span className="text-muted">({release.slice(0, 4)})</span> </h2>

                                <h6 className="text-muted ml-3 thin">{video.tagline}</h6>

                                <div className="row py-3  my-3">
                                    <div className="col-md-5  ">
                                        <p className="text-light text-truncate mb-5">
                                            <span className="text-secondary font-weight-lighter">Created by:</span> {creator.map(el => el.name).join(", ")}
                                        </p>

                                    </div>
                                    <div className=" col-md-7  ">
                                        <p className="text-light mb-5">
                                            <span className="text-secondary font-weight-lighter">Genres:</span> {video.genres.map(el => el.name).join(", ")}
                                        </p>

                                    </div>
                                    <div className="col-md-5  ">

                                        <p className="text-light text-truncate mb-5">
                                            <span className="text-secondary font-weight-lighter">Seasons:</span> {oneToNum(video.number_of_seasons).join(" ")}
                                        </p>

                                    </div>
                                    <div className=" col-md-7  ">

                                        <p className="text-light mb-5">
                                            <span className="text-secondary font-weight-lighter">Runtime:</span> {formatTime(runtime)}
                                        </p>

                                    </div>
                                    <div className="col-md-5  ">


                                        <p className="text-light" >
                                            <span className="text-secondary font-weight-lighter">First Air Date:</span> {formatDate(release)}
                                        </p>
                                    </div>
                                    <div className=" col-md-7  ">


                                        <p className="text-light">
                                            <span className="go-to-trailer" onClick={() => this.goToTrailer()}>
                                                <i className="fa fa-play"></i> Play Trailer
                                           </span>
                                        </p>
                                    </div>

                                </div>
                                <h5>Cast</h5>
                                <p>{cast}</p>

                                <h5>Overview</h5>
                                <p>{video.overview}</p>

                            </div>

                        </div>

                        <Reviews reviews={video.reviews} />

                        <div className="row my-3">
                            <h3 className="col-md-12">Similar movies</h3>
                            {video.results.map((video, index) => {
                                return (
                                    <MoviePoster key={uuid()} video={video} />)
                            })}
                        </div>

                        <VideoPlayer trailer={this.state.trailer} />
                        <TTable torrents={torrents} />
                    </div>
                </div>
            );
        return <div></div>
    }
}


let mapState = (state) => {
    const { video, fetching, torrents } = state.reducer

    return { video, fetching, torrents }
}

let mapProps = (dispatch) => {
    return bindActionCreators({ getVideos, getDetails, fetchingData, getTorrentLinks }, dispatch)
}
export default connect(mapState, mapProps)(Details);








function formatTime(mins) {
    mins = typeof (mins) === "object" ? mins[0] : mins
    let hrs = Math.floor(mins / 60)
    mins = mins ? mins % 60 : ''
    if (hrs > 0 && mins < 1) {
        return "60 mins"
    }
    if (hrs > 0)
        return hrs + "h " + mins + "m"
    return mins + " mins"
}
function formatDate(date) {
    let year = date.slice(0, 4)
    date = new Date(date)
    let month = date.toLocaleString('default', { month: 'short' });
    let day = date.getDate()
    return (`${day} ${month}, ${year}`)
}
function getColor(value) {
    value /= 10
    var hue = ((value) * 100).toString(10);
    let x = ["hsl(", hue, ",100%,50%)"].join("");
    return x
}
function oneToNum(num) {
    let arr = []
    for (let i = 1; i <= num; i++)
        arr.push(i)
    return arr
}