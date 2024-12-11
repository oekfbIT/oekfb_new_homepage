/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const NewsArticle = ({ className }: Props): JSX.Element => {
  return (
    <div className={`news-article ${className}`}>
      <div className="div-2">
        <div className="news-article-img" />

        <div className="div-3">
          <div className="title-3">
            Download the official
            <br />
            Bundesliga app!
          </div>

          <p className="subtitle-3">
            The excitement of the Bundesliga plus all the
            <br />
            latest news, views, features and exclusive
            <br />
            video content at your fingertips...
          </p>
        </div>
      </div>
    </div>
  );
};
