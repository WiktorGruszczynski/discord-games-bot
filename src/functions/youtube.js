const axios = require('axios');

async function getHTML(url)
{
    response = await axios.get(url).catch(async () => {return 400})
    html = response.data;
    return html;
}


async function youtube_JSON(url)
{
    html = await getHTML(url);

    try
    {
        data = html.split("var ytInitialData = ")[1].split(";</script><script")[0];
        return JSON.parse(data);
    }
    catch(err){
        return null
    }
}


async function list_videos(url)
{   
    json_data = await youtube_JSON(url);
    if (!json_data){
        return null
    }

    
    const items = json_data.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content.richGridRenderer.contents;

    return items.map((item)=>{
        try{
            return item.richItemRenderer.content.videoRenderer
        }
        catch(err){
            return "DELETE"
        }
    }).filter(item=>item!="DELETE")

}

function getTimestamp(text, title)
{
    SECOND = 1000;
    MINUTE = SECOND*60;
    HOUR = MINUTE*60;
    DAY = HOUR*24;
    WEEK = DAY*7;
    MONTH = DAY*30;
    YEAR=DAY*365;

    numbers = text
        .replace(`${title} by `, '')
        .replace(`no views`,'0 views')
        .replaceAll('seconds','second')
        .replaceAll('minutes','minute')
        .replaceAll('hours','hour')
        .replaceAll('days','day')
        .replaceAll('weeks','week')
        .replaceAll('months','month')
        .replaceAll('years','year')
        .replaceAll('second',SECOND)
        .replaceAll('minute',MINUTE)
        .replaceAll('hour',HOUR)
        .replaceAll('day',DAY)
        .replace('week',WEEK)
        .replace('month',MONTH)
        .replace('YEAR',YEAR)        
        .split(' ').slice(0,-2).join(' ') //remove views  
        .replace(/\D/g, ' ')
        .replace(/  +/g, ' ')
        .split(' ')
        .slice(1);

    now = Number(new Date());
    for (var i=0; i<numbers.length; i+=2){
        now -= (numbers[i]*numbers[i+1]);
    }

    return now;
}


async function getVideo(channel_id, index)
{
    return await list_videos(`https://www.youtube.com/${channel_id}/videos/?hl=en`).then((videos)=>{
        const video = videos[index]
        
        const title = video.title.runs[0].text
        const label = video.title.accessibility.accessibilityData.label
        return {
            title: title,
            videoId: video.videoId,
            url: `https://www.youtube.com/watch?v=${video.videoId}`,
            timestamp: getTimestamp(label, title),
            thumbnail: video.thumbnail.thumbnails
        }
    }).catch((err) => {
        return null
    })
}

async function ChannelInfo(channel_id)
{
    data =  await youtube_JSON(`https://www.youtube.com/${channel_id}/videos/?hl=en`)
    let channel = data.header.c4TabbedHeaderRenderer

    return {
        title: channel.title,
        avatar: channel.avatar.thumbnails.at(-1),
        banner: channel.banner.thumbnails.at(-1),
        subscribers: channel.subscriberCountText.simpleText.split(' ')[0]
    }

}

async function LatestVideo(channel_id)
{
    return await getVideo(channel_id, 0)
}



module.exports = {LatestVideo, ChannelInfo}