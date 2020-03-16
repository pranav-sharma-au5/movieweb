import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import { getVideos, getDetails, clearVideo, clearAllVideos } from "../actions/actions";
import "./Details.css"
import axios from "axios";
const api_key = '71e17cf532242a8619c4f89f2b8c3cb5'

class Details extends Component {
    state = {
        trailer: ''
    }

    componentDidMount() {
        console.log("detail page mounted")
        const { movieId, tvId, movie } = this.props.match.params
        const id = movieId || tvId
        const tab = movie ? "movie" : "tv"
        this.props.getDetails(tab, id)
        window.scrollTo(0, 0)
        let url = `https://api.themoviedb.org/3/${tab}/${id}/videos?api_key=${api_key}&language=en-US`

        axios.get(url).then(videosData => {
            let trailer = videosData.data.results[0]
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
    componentWillUnmount() {
        this.props.clearVideo()
    }


    render() {
        console.log(this.props)
        let { video } = this.props
        let title = video.title || video.name
        let release = video.release_date || video.first_air_date
        let runtime = video.runtime || video.episode_run_time
        let { cast, crew } = video
        let director, writer
        if (video) {
            writer = crew.filter(el => el.department === "Writing")
            director = crew.filter(el => el.job === "Director")
            cast = cast.slice(0, 5).map(el => el.name).join(", ")
        }
        document.documentElement.style.setProperty("--final", (140 - (140 * parseInt(video.vote_average)) / 10))
        return (
            <div className="mx-4">
                <header className='mb-5'>
                    <nav onClick={() => this.props.clearAllVideos()}>
                        <Link to="/movies" >
                            <button className='btn btn-outline-secondary mx-3 ' >Movies</button>
                        </Link>
                        <Link to="/tvshows" >
                            <button className='btn btn-outline-secondary' >TV Shows</button>
                        </Link>
                    </nav>
                </header>
                <div className="mx-3" >
                    <div className="row">
                        <div className="col-md-4">
                            <img className="posterImage" width="85%" src={`http://image.tmdb.org/t/p/original/${video.poster_path}`} alt="" />
                        </div>

                        {video &&
                            <div className="col-md-7 bg-details p-3 posterImage rounded">
                                <div className="percent float-right">
                                    <svg>
                                        <circle cx="1.6rem" cy="1.6rem" r="1.4rem" />
                                        <circle cx="1.6rem" cy="1.6rem" r="1.4rem" />
                                        {/* <circle cx="1.6rem" cy="1.6rem" r="1.4rem"
                                            style={{ strokeDashoffset: (140 - (140 * parseInt(video.vote_average)) / 10) }} /> */}
                                    </svg>
                                    <div className="number">
                                        <p>{video.vote_average * 10} <span>%</span></p>
                                    </div>
                                </div>

                                <h2> {title} <span className="text-muted">({release.slice(0, 4)})</span> </h2>

                                <h6 className="text-muted">{video.tagline}</h6>

                                <div className="row py-3  my-3">
                                    <div className="col-md-5  ">
                                        <p className="text-light text-truncate mb-5">
                                            <span className="text-secondary font-weight-lighter">Director:</span> {director.map(el => el.name).join(", ")}
                                        </p>
                                        <p className="text-light text-truncate mb-5">
                                            <span className="text-secondary font-weight-lighter">Writer:</span> {writer.map(el => el.name).join(", ")}
                                        </p>
                                        <p className="text-light" >
                                            <span className="text-secondary font-weight-lighter">Release:</span> {formatDate(release)}
                                        </p>
                                    </div>
                                    <div className=" col-md-7  ">
                                        <p className="text-light mb-5">
                                            <span className="text-secondary font-weight-lighter">Genres:</span> {video.genres.map(el => el.name).join(", ")}
                                        </p>
                                        <p className="text-light mb-5">
                                            <span className="text-secondary font-weight-lighter">Runtime:</span> {formatTime(runtime)}
                                        </p>
                                        <p className="text-light">
                                            <i className="fa fa-play"></i> Play Trailer
                                        </p>
                                    </div>

                                </div>
                                <h5>Cast</h5>
                                <p>{cast}</p>

                                <h5>Overview</h5>
                                <p>{video.overview}</p>

                            </div>

                        }
                    </div>

                    <div className="row my-5 ">
                        <h3 className="col-md-12">Reviews</h3>
                        <div className="col-md-12 bg-details">
                            {video && video.reviews.map(el =>
                                <div key={Math.floor(Math.random() * 100000)} className="column p-2">

                                    <h5 >
                                        {el.author}
                                    </h5>

                                    <p className=" review-text">
                                        {el.content}
                                    </p>

                                </div>
                            )}
                            {video && !video.reviews.length &&
                                <div className="col p-3 ">
                                    No reviews yet!
                            </div>
                            }
                        </div>
                    </div>

                    <div className="row my-3">
                        <h3 className="col-md-12">Similar movies</h3>
                        {video && video.results.map((video, index) => {
                            let videoName = video.title || video.name

                            return (
                                < div key={index} className="col-2  thumbnail">
                                    <Link id={video.id}
                                        to={`/movies/${videoName.replace(/\s/g, "-").toLowerCase()}/${video.id}`}>

                                        <img className="poster" src={`http://image.tmdb.org/t/p/w500/${video.poster_path}`} alt="" />

                                        <p className=" title col text-truncate text-white">
                                            {videoName}
                                        </p>
                                        <i className="fa fa-heart"></i>
                                        <i className="fa fa-star"> <span className="text-white">{video.vote_average}</span></i>
                                    </Link>

                                </div>)
                        })}
                    </div>

                    <div className="row my-3">
                        <h3 className="col-md-12"> Trailer</h3>

                        <div className="col-md-8">
                            <iframe title="player" width="700" height="450" src={`https://www.youtube.com/embed/${this.state.trailer}`} frameborder="0"></iframe>
                        </div>

                    </div>


                </div>
            </div>
        );
    }
}


let mapState = (state) => { return { video: state.reducer.video } }

let mapProps = (dispatch) => {
    return bindActionCreators({ getVideos, getDetails, clearVideo, clearAllVideos }, dispatch)
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