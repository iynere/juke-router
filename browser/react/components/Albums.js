import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Albums extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const albums = this.props.albums;

    return (
      <div>
        <h3>Albums</h3>
        <div className="row">
        {
          albums.map(album => (
            <div className="col-xs-4" key={album.id}>
              <Link to={`/albums/${album.id}`} className="thumbnail">
                <img src={album.imageUrl} />
                <div className="caption">
                  <h5>
                    <span>{album.name}</span>
                  </h5>
                  <small>{album.songs.length} songs</small>
                </div>
              </Link>
            </div>
          ))
        }
        </div>
      </div>
    );
  }
}
