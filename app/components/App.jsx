import React from 'react';
import ReactDOM from 'react-dom';
import QueryString from 'query-string'
import ListItem from 'components/ListItem'
import VideoAnalytics from 'components/VideoAnalytics'
import video_api from 'util/video_api'

export default class App extends React.Component {
  constructor() {
       super();
       this.state = { data: [] };

    /*   const p = QueryString.parse(location.search);
       console.log(p);
       if(p.v) {
            this.state.video = {v: p.v, c: p.c, s: p.t};
       } */
  }

  componentWillMount() {
    const p = QueryString.parse(location.search);

    if(p.v && p.c && p.t && !this.state.video) {
         this.state.video = {v: p.v, c: p.c, s: p.t};
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
                video_api.fetchAnalytics(this.state.video.v, this.state.video.c, this.state.video.s, (data) => {   data.title = this.state.video.name; data.from = this.state.video.s; this.setState({video_data: data}) });
    } );


    }
}
//this.state.data.items.map(item=><li key={item.contentDetails.videoId}>{item.snippet.title}</li>)
  render() {
    console.log(this.state);
    if(this.state.data.snippet) {
        const snippet = unescape(this.state.data.snippet);
        return ( <div id="message"  dangerouslySetInnerHTML=  { {__html: this.state.data.snippet } }>

                  </div>
              );
    }
    if(!this.state.video_data) {
          return (
            <div id="content">
              <ul className="nav">
                  {
                  this.state.data.items ?
                      this.state.data.items.map((item) =>
                        <ListItem key={item.id} videoId={item.contentDetails.videoId} name={item.snippet.title} channelId={item.snippet.channelId} />)
                  :
                    <li>Loading...</li>
                  }
              </ul>
            </div>
          );
    } else {

        return   <div id="content">
                  <VideoAnalytics data={this.state.video_data}/>
                </div>

    }


    }
  }
