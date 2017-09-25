const config = require('config');

const video_api =
{

    fetchAnalytics: function(v, c, s, e, callback) {
        fetch(config.rest_url+"/video-analytics?v="+v+"&c="+c+"&t="+s+"&e="+e)
          .then(result=>result.json())
            .then(data => {
                callback(data);
            })
    },

    fetchPlaylistItems: function(callback) {
      fetch(config.rest_url+"/playlist-items")
      .then(result =>
                      result.json()
                    )
        .then(data => {
            callback(data);
        })
      },

    fetchVideoDetails: function(v, callback)
    { fetch(config.rest_url+"/video-details?v="+v)
      .then(result=>result.json())
        .then(data => {
            callback(data);
        });
    }

}

export default video_api;
