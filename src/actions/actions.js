import axios from "axios"
const api_key = '71e17cf532242a8619c4f89f2b8c3cb5'
const api_key2 = '3c41f150'

export function getVideos(category, page) {
    let request = axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${category}/popular?api_key=${api_key}&language=en-US&page=${page}`
    })

    return (dispatch) => {

        request.then(data => {
            dispatch({
                type: "getVideos",
                payload: data.data.results

            })
        })

    }
}
export function getMoreVideos(category, page) {
    let request = axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${category}/popular?api_key=${api_key}&language=en-US&page=${page}`
    })

    return (dispatch) => {

        request.then(data => {
            dispatch({
                type: "getMoreVideos",
                payload: data.data.results

            })
        })

    }
}
export function getDetails(category, id) {

    let request1 = axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/${category}/${id}?api_key=${api_key}&language=en-US`
    })
    let request2 = axios.get(
        `https://api.themoviedb.org/3/${category}/${id}/credits?api_key=${api_key}`
    )
    let request3 = axios.get(
        `https://api.themoviedb.org/3/${category}/${id}/reviews?api_key=${api_key}&language=en-US&page=1`
    )
    let request4 = axios.get(
        `https://api.themoviedb.org/3/${category}/${id}/similar?api_key=${api_key}&language=en-US&page=1`
    )


    return (dispatch) => {

        request1.then(data => {
            request2.then(cast => {
                request3.then(reviewdata => {
                    const obj = {
                        reviews: reviewdata.data.results
                    }
                    request4.then(similar => {
                        dispatch({
                            type: "getDetails",
                            payload: { ...data.data, ...cast.data, ...obj, ...similar.data }
                        })
                    })

                })
            })
        })

    }
}
export function changeTab() {
    return { type: "tab" }
}



export function fetchingData() {
    return {
        type: "fetch"
    }
}

export function getTorrentLinks(video) {
    let request = axios({
        method: "get",
        url: ` http://get-magnet.herokuapp.com/?video=${video}`
    })
    return (dispatch) => {
        request.then(torrents => {
            dispatch({
                type: "torrents",
                payload: torrents.data
            })
        })
    }
}
export function search(query) {
    let request = axios.get(`
    https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${query}&page=1&include_adult=false`)

    return (dispatch) => {
        request.then(res => {
            dispatch({
                type: "search",
                payload: res.data.results
            })
        })
    }
}
export function getTrailer(tab, id) {
    let url = `https://api.themoviedb.org/3/${tab}/${id}/videos?api_key=${api_key}&language=en-US`
    return dispatch => {

        axios.get(url).then(videosData => {
            let trailer = videosData.data.results[0] || { type: undefined }
            console.log(trailer)
            return dispatch({
                type: "trailer",
                payload: trailer
            })
        })
    }
}

export function getOmdbData(imdb_id) {
    const request = axios.get(`http://www.omdbapi.com/?apikey=${api_key2}&i=${imdb_id}`)
    return (dispatch) => {
        request.then(res => {
            dispatch({
                type: "omdbData",
                payload: res.data
            })
        })
    }
}