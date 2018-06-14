import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import styled, { consolidateStreamedStyles } from "styled-components";
import Track from "../components/Track";
import Card from "../components/Card";
import ButtonPrimary from "../components/ButtonPrimary";
import Playlist from "../components/Playlist";

// const url = 'http://localhost:3001/api/v1/spotify/?query';
const url = "https://jffy-api.herokuapp.com/api/v1/spotify/?query";

class ArtistTracks extends Component {
   state = { tracks: [] };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/artists/${
         match.params.id
      }/top-tracks/?country=us`;
      axios.get(`${url}=${query}`).then(({ data }) => {
         // console.log("artist tracks axios", data);

         this.setState({ tracks: data.tracks });
      });
   }

   render() {
      // console.log("artisttracks", this.state.tracks);
      const artistTracksList = this.state.tracks.map(track => {
         // console.log(
         //    "inside loop: ",
         //    track.name,
         //    track.explicit,
         //    track.album.images[2].url
         // );

         return (
            <Track
               type="artist"
               key={track.id}
               albumImage={track.album.images[2].url}
               trackName={track.name}
               trackDuration={track.duration_ms}
               explicit={track.explicit}
            />
         );
      });
      return artistTracksList;
      // (

      //    <React.Fragment>
      //       {this.state.tracks.map(track => (
      //          <a href={track.preview_url} target="_blank" key={track.id}>
      //             {track.name}
      //          </a>
      //       ))}
      //    </React.Fragment>
      // );
   }
}

class AlbumTracks extends Component {
   state = { tracks: [] };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/albums/${match.params.id}`;
      axios.get(`${url}=${query}`).then(({ data }) => {
         this.setState({ tracks: data.tracks.items });
      });
   }
   render() {
      return (
         <React.Fragment>
            {this.state.tracks.map(track => (
               <a href={track.preview_url} target="_blank" key={track.id}>
                  {track.name}
               </a>
            ))}
         </React.Fragment>
      );
   }
}

class PlaylistTracks extends Component {
   state = {
      tracks: [],
      tracksTotal: null,
      playlistImageURL: "",
      playlistDescription: "",
      playlistName: "",
      playlistOwner: "",
      ablbumName: "",
      dataType: ""
   };

   componentDidMount() {
      const { match } = this.props;
      const query = `https://api.spotify.com/v1/users/spotify/playlists/${
         match.params.id
      }`;
      axios.get(`${url}=${query}`).then(({ data }) => {
         console.log("track list: ", data);
         this.setState({
            tracks: data.tracks.items,
            tracksTotal: data.tracks.total,
            playlistImageURL: data.images[0].url,
            playlistDescription: data.description,
            playlistName: data.name,
            playlistOwner: data.owner.display_name,
            dataType: data.type
         });
      });
   }

   render() {
      return (
         <Playlist
            tracksTotal={this.state.tracksTotal}
            playlistImageURL={this.state.playlistImageURL}
            playlistDescription={this.state.playlistDescription}
            playlistName={this.state.playlistName}
            playlistOwner={this.state.playlistOwner}
            tracks={this.state.tracks}
         />
      );
   }
}

const TrackComponents = {
   playlist: PlaylistTracks,
   artist: ArtistTracks,
   album: AlbumTracks
};

const Tracks = styled.div`
   display: flex;
   flex-direction: column;
`;

class TracksContainer extends Component {
   render() {
      const path = `/${this.props.name}/:id`;
      const Component = TrackComponents[this.props.name];
      return (
         <div>
            <h1>{this.props.name}</h1>
            <Tracks>
               <Route
                  path={path}
                  render={props => (
                     <Component name={this.props.name} {...props} />
                  )}
               />
            </Tracks>
         </div>
      );
   }
}

export default TracksContainer;
