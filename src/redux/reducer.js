let initialState = {
    videos: [],
    video: '',
    page: 1
}

export function reducer(state = initialState, action) {
    let stateCopy = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "getVideos":
            stateCopy.videos = action.payload
            stateCopy.page = 1
            return stateCopy
        case "getMoreVideos":
            stateCopy.videos = [...stateCopy.videos, ...action.payload]
            stateCopy.page++
            return stateCopy
        case "getDetails":
            console.log(action.payload)
            stateCopy.video = action.payload
            return stateCopy
        case "clear":
            stateCopy.video = ''
            return stateCopy
        case "clear_all":
            stateCopy.videos = []
            return stateCopy
        default:
            return stateCopy
    }
}

