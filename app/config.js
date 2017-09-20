const config = {
  rest_url: "https://radiant-escarpment-48666.herokuapp.com",
  analytics_headers: {
      "averageViewDuration" : {
          "title" : "Average View Duration",
          "description" : "The average length of video playbacks."
      },
      "views": {
          "title" : "Views",
          "description": "Number of students that have clicked play on this video"
      },
      "averageViewPercentage" :
      {
          "title" : "Average View Percentage",
          "description": "The average percentage of a video watched during a video playback."
      },
      "estimatedMinutesWatched" :
      {
          "title" : "Estimated Minutes Watched",
          "description": "How long users watched this video"
      }
  }
};

module.exports = config;
