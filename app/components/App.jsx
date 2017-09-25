import React from 'react';
import ReactDOM from 'react-dom';
import QueryString from 'query-string'
import ListItem from 'components/ListItem'
import VideoAnalytics from 'components/VideoAnalytics'
import VideoForm from 'components/VideoForm'
import video_api from 'util/video_api'
import dateFormat from 'dateformat';
import config from 'config';

export default class App extends React.Component {
  constructor() {
       super();
       this.state = { data: [] };
  }

  componentWillMount() {
    const p = QueryString.parse(location.search);

    if(p.v && p.c && p.t && !this.state.video) {
         this.state.video = {v: p.v, c: p.c, s: p.t, e: p.e};
    } else {
        this.state.video = null; // default to home page with bad request
    }
  }

  componentDidMount() {
    if(!this.state.video) {
          video_api.fetchPlaylistItems((data) => { this.setState({data});

      })
    } else {
        video_api.fetchVideoDetails(this.state.video.v, (data) => {
              this.state.video.name = data.items[0].snippet.localized.title;
                video_api.fetchAnalytics(this.state.video.v, this.state.video.c, this.state.video.s, this.state.video.e, (data) => {   data.title = this.state.video.name; data.from = this.state.video.s; data.to = this.state.video.e; this.setState({video_data: data}) });
    } );
    }
}

render() {
    if(this.state.data.authUrl) {
        return ( <div id="authenticate">
                    <a target="_blank" href={this.state.data.authUrl}>Follow this link and copy the code below:</a>
                    <form action={config.rest_url + this.state.data.action}>
                          <input name='code' length='18'/>
                    </form>
                </div>
              );
    }
    if(!this.state.video_data) {
          return (
              <div id="content">
                <h2>BOLD Youtube Video Analytics</h2>
                <p>Enter the video share link, the start date and optionally, the end date.</p>
                <VideoForm vdata={this.state.video_data} />
              </div>
          )
    } else {

        return   <div id="content">
                  <VideoAnalytics data={this.state.video_data}/>
                </div>

    }
  }
}
