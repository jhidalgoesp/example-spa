import React from "react";

const Tweets = ({ tweets = [] }) => {
  return (
    <div>
      {tweets.length > 0 &&
        tweets.map((tweet) => {
          return (
            <div className="card" key={tweet.id}>
              <div className="card-content">
                <p className="title">
                  “{tweet.text}”
                </p>
                <p className="subtitle">{tweet.user.screen_name}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Tweets;
