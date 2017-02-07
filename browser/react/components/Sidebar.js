import React from 'react';

const Sidebar = (props) => {

  const deselectAlbum = props.deselectAlbum;

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <a href="#" onClick={deselectAlbum}>ALBUMS</a>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
