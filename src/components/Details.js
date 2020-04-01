import React, { Component } from 'react';
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import { getVideos, getDetails, fetchingData, getTorrentLinks, getTrailer, getOmdbData } from "../actions/actions";
import MoviePoster from "./MoviePoster";
import Reviews from "./Reviews";
import VideoPlayer from "./VideoPlayer";
import { v4 as uuid } from 'uuid';
import TTable from "./torrentsTable";
import "./Details.css"

const rotTomatoUrl = `https://www.rottentomatoes.com//assets/pizza-pie/images/icons/global/new-cf.9b01b08d257.png`
const metaUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/600px-Metacritic.svg.png`
// const ImdbUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/600px-Metacritic.svg.png`


class Details extends Component {
    state = {
        trailer: false
    }

    toggleTrailer = () => {
        this.setState((prevState) => ({ trailer: !prevState.trailer }))
    }



    componentDidMount() {
        let { video, fetching, getTorrentLinks, fetchingData, getDetails, getTrailer } = this.props
        const { movieId, movie } = this.props.match.params
        const id = movieId
        const tab = movie ? "movie" : "tv"
        //don't have the video and it is not getting fetched then make request
        if (!(fetching || video)) {
            //set flag to indicate data fetching
            fetchingData()
            getDetails(tab, id)
        }
        getTorrentLinks(movie.replace(/-/g, "+"))
        getTrailer(tab, id)
        window.scrollTo(0, 0)



    }
    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.componentDidMount()
        }
        if (prevProps.video.imdb_id !== this.props.video.imdb_id) {
            const { video: { imdb_id }, getOmdbData } = this.props
            getOmdbData(imdb_id)
        }

    }



    render() {
        const { trailer: showtrailer } = this.state
        let { video, fetching, torrents, trailer, omdb } = this.props
        let title = video.title
        let release = video.release_date
        let runtime = video.runtime
        let { cast, crew } = video
        let director, writer
        if (video) {
            writer = crew.filter(el => el.department === "Writing")
            director = crew.filter(el => el.job === "Director")
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

                                <div className="row ratings-parent ">
                                    <div className="imdb">
                                        <i className="fa ratings fa-imdb"></i> <span className="ratings-value">{omdb ? omdb.Ratings[0] ? omdb.Ratings[0].Value : '' : ""}</span>
                                    </div>
                                    <div className="imdb">
                                        <img src={rotTomatoUrl} className="ratings" alt="" /> <span className="ratings-value">{omdb ? omdb.Ratings[1] ? omdb.Ratings[1].Value : '' : ''}</span>
                                    </div>
                                    <div className="imdb">
                                        <img src={metaUrl} className="ratings" alt="" /><span className="ratings-value">{omdb ? omdb.Ratings[2] ? omdb.Ratings[2].Value : '' : ''}</span>
                                    </div>
                                </div>

                                <div className="row py-3  my-3">
                                    <div className="col-md-5  ">
                                        <p className="text-light text-truncate mb-5">
                                            <span className="text-secondary font-weight-lighter">Director:</span> {director.map(el => el.name).join(", ")}
                                        </p>

                                    </div>
                                    <div className=" col-md-7  ">
                                        <p className="text-light mb-5">
                                            <span className="text-secondary font-weight-lighter">Genres:</span> {video.genres.map(el => el.name).join(", ")}
                                        </p>

                                    </div>
                                    <div className="col-md-5  ">

                                        <p className="text-light text-truncate mb-5">
                                            <span className="text-secondary font-weight-lighter">Writer:</span> {writer.map(el => el.name).join(", ")}
                                        </p>

                                    </div>
                                    <div className=" col-md-7  ">

                                        <p className="text-light mb-5">
                                            <span className="text-secondary font-weight-lighter">Runtime:</span> {formatTime(runtime)}
                                        </p>

                                    </div>
                                    <div className="col-md-5  ">


                                        <p className="text-light" >
                                            <span className="text-secondary font-weight-lighter">Release:</span> {formatDate(release)}
                                        </p>
                                    </div>
                                    <div className=" col-md-7  ">


                                        <p className="text-light">
                                            <span className="go-to-trailer" onClick={() => this.toggleTrailer()}>
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
                        <div className={showtrailer ? `d-flex backdrop-iframe` : `d-none`} >

                            <VideoPlayer toggleTrailer={this.toggleTrailer} trailer={trailer} />
                        </div>

                        <Reviews reviews={video.reviews} />

                        <div className="row my-3">
                            <h3 className="col-md-12">Similar movies</h3>
                            {video.results.map((video, index) => {
                                return (
                                    <MoviePoster key={uuid()} video={video} />)
                            })}
                        </div>


                        <TTable torrents={torrents} />

                    </div>
                </div>
            );
        return <div></div>
    }
}


let mapState = (state) => {
    const { video, fetching, torrents, trailer, omdb } = state.reducer
    return { video, fetching, torrents, trailer, omdb }
}

let mapProps = (dispatch) => {
    return bindActionCreators({ getVideos, getDetails, fetchingData, getTorrentLinks, getTrailer, getOmdbData }, dispatch)
}
export default connect(mapState, mapProps)(Details);








function formatTime(mins) {
    let hrs = Math.floor(mins / 60)
    mins = mins % 60
    if (hrs > 0)
        return hrs + "h " + mins + "m"
    return mins + "mins"
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