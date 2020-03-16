import axios from "axios"
const api_key = '71e17cf532242a8619c4f89f2b8c3cb5'

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
export function clearVideo() {
    return { type: "clear" }
}

export function clearAllVideos() {
    return { type: "clear_all" }

}