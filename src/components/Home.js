import React, { Component } from 'react';
import { connect } from "react-redux"
import { getVideos, getMoreVideos, getDetails } from "../actions/actions";
import { bindActionCreators } from 'redux';
import { v4 as uuid } from 'uuid';
import MoviePoster from "./MoviePoster";

class Home extends Component {
    state = {
        tab: ""
    }

    componentDidMount() {
        let video = window.location.pathname === "/movies" ? 'movie' : 'tv'
        this.setState({ tab: video }, () => {
            let check1, check2;
            if (this.props.reducer.videos[0]) {
                let video = this.props.reducer.videos[0]
                check1 = window.location.pathname === "/movies" && video.title
                check2 = window.location.pathname === "/tvshows" && video.name
            }
            if (!(check1 || check2))
                this.props.getVideos(video, 1)
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.componentDidMount()
        }

    }


    load = () => {
        this.props.getMoreVideos(this.state.tab, this.props.reducer.page + 1)
    }




    render() {
        let { videos } = this.props.reducer
        return (<div>



            <main>
                <h2 className="my-3 ">
                    Popular {this.state.tab === 'movie' ? "Movies" : "TV Shows"}
                </h2>

                <div className="row w-100">
                    {videos.map((video, index) => {

                        return (
                            <MoviePoster tab={this.state.tab} key={uuid()} video={video} />
                        )
                    }
                    )}
                    <div className="col-6 col-xl-2 load-more col-lg-3 col-md-4  align-items-center justify-content-center flex-column d-flex">

                        <button className='w-50  btn btn-outline-warning' onClick={this.load} >Load more</button>
                    </div>
                </div>


            </main >

        </div >);
    }
}


let mapState = (state) => state
let mapProps = (dispatch) => {
    return bindActionCreators({ getVideos, getMoreVideos, getDetails }, dispatch)
}

export default connect(mapState, mapProps)(Home);