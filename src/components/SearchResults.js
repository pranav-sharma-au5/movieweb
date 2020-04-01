import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import MoviePoster from "./MoviePoster";
import { connect } from "react-redux"
import { search } from "../actions/actions";
import { bindActionCreators } from 'redux';

function Searchresults(props) {
    const { search, propVideos, tab } = props
    const params = new URLSearchParams(props.location.search)
    const [query] = useState(params.get('query'))
    const [videos, setVideos] = useState(propVideos)

    useEffect(() => {
        search(query)
    }, [query, search])
    useEffect(() => {
        setVideos(propVideos)
    }, [propVideos])


    return (<div>
        <main>
            <h2 className="my-3 ">
                {/* Seach Results for  {query} */}
            </h2>

            <div className="row w-100">
                {videos.map((video, index) => {

                    return (
                        <MoviePoster tab={tab} key={uuid()} video={video} />
                    )
                }
                )}
                <div className="col-2 align-items-center justify-content-center flex-column d-flex">

                    {/* <button className='w-50 btn btn-outline-warning' onClick={this.load} >Load more</button> */}
                </div>
            </div>


        </main >

    </div >);


}
const mapState = (state) => {
    const { videos: propVideos } = state.reducer
    return { propVideos }
}

const mapProps = (dispatch) => {
    return bindActionCreators({ search }, dispatch)
}

export default connect(mapState, mapProps)(Searchresults) 