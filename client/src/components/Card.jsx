import React from "react";
import { downloadImage } from "../utils";
import {MdDownloading} from "react-icons/md"
const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div>
      <div className="card-container">
        <img src={photo} alt={prompt} />
        <div className="card-info">
          <p>{prompt}</p>
          <div className="card-download">
            <div>
              <div className="card-name-logo">{name[0]}</div>
              <p>{name}</p>
            </div>
            
                      <MdDownloading className="download-btn" onClick={() => downloadImage(_id,photo)} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
