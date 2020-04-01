let initialState = {
    videos: [],
    video: '',
    page: 1,
    fetching: false,
    torrents: [],
    searchResults: '',
    trailer: '',
    omdb: ''
}

export function reducer(state = initialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "getVideos":
            stateCopy.fetching = false
            stateCopy.videos = action.payload.filter(el => el.poster_path)
            stateCopy.page = 1
            return stateCopy
        case "getMoreVideos":
            stateCopy.fetching = false
            stateCopy.videos = [...stateCopy.videos, ...action.payload.filter(el => el.poster_path)]
            stateCopy.page++
            return stateCopy
        case "getDetails":
            stateCopy.fetching = false
            stateCopy.video = action.payload
            return stateCopy
        case "clear":
            stateCopy.video = ''
            return stateCopy
        case "clear_all":
            stateCopy.videos = []
            return stateCopy
        case "fetch":
            stateCopy.fetching = true
            return stateCopy
        case "torrents":
            stateCopy.torrents = action.payload
            return stateCopy
        case "search":
            stateCopy.videos = action.payload.filter(el => el.poster_path)
            return stateCopy
        case "trailer":
            const trailer = action.payload
            stateCopy.trailer = (trailer.type === "Trailer") ? trailer.key : ''
            return stateCopy
        case "omdbData":
            stateCopy.omdb = action.payload
            return stateCopy
        default:
            return stateCopy
    }
}

