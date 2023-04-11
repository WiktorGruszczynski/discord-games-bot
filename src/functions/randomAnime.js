const { default: axios } = require("axios")

module.exports = async () =>{
    index = Math.round(Math.random()*24)
    page = Math.round(Math.random()*49)
    response = (await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`))
    data = response.data.data[index]

    const start = data.aired.prop.from
    const end = data.aired.prop.to

    return {
        title: data.titles[0].title,
        url: data.url,
        description: data.synopsis.replace('\n\n[Written by MAL Rewrite]','\n'),
        genres: data.genres,
        score: data.score,
        episodes: data.episodes,
        duration: data.duration,
        airing: data.airing,
        start: `${start.day}-${start.month}-${start.year}`,
        end: `${end.day}-${end.month}-${end.year}`,
        studios: data.studios,
        thumbnail: data.images.jpg.large_image_url
    }
}
