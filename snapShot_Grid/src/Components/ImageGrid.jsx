import React, { useState } from 'react';

const ImageGrid = ({ fecthedValue }) => {
  console.log('a', fecthedValue);
  return (
    <div className="imageContainer">
      <p>
        {fecthedValue.length > 1 ? (
          <div className="imageGridContainer">
            {fecthedValue.map((ele) => {
              let farm = ele.farm;
              let server = ele.server;
              let id = ele.id;
              let secret = ele.secret;
              let title = ele.title;
              return (
                <div className="indiContainer">
                  <img
                    src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`}
                    alt={`${title}`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="noGrid">
            <h4>Search for Images to display here </h4>
          </div>
        )}
      </p>
    </div>
  );
};

export default ImageGrid;

// 0: Object
// farm: 66
// id: "53019498132"
// isfamily: 0
// isfriend: 0
// ispublic: 1
// owner: "85549406@N00"
// secret: "dfbc182fde"
// server: "65535"
// title: "London black cab"
