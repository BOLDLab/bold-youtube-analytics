const config = require('config');

const video_api =
{

    fetchAnalytics: (v, c, s, callback) => {
        fetch(config.rest_url+"/video-analytics?v="+v+"&c="+c+"&t="+s)
          .then(result=>result.json())
            .then(data => {
                callback(data);
            })
    },

    fetchPlaylistItems: (callback) => fetch(config.rest_url+"/playlist-items")
      .then(result =>
                      result.json()
                    )
        .then(data => {
            callback(data);
        }),

    fetchVideoDetails: (v, callback) => fetch(config.rest_url+"/video-details?v="+v)
      .then(result=>result.json())
        .then(data => {
            callback(data);
        })

}

export default video_api;
