import "./App.css";
import Tweets from "./components/Tweets";
import { useEffect, useState } from "react";
import axios from "axios";

const userEndpoint =
  "https://wwdg2g2q44.execute-api.us-east-1.amazonaws.com/dev/api/v1/users";
const tweetsEndpoint =
  "https://wwdg2g2q44.execute-api.us-east-1.amazonaws.com/dev/api/v1/tweets";

function App() {
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);

  const userId = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  }).id;

  useEffect(() => {
    fetchUser();
  }, [userId]);

  useEffect(() => {
    fetchTweets();
  }, [user]);

  async function fetchUser() {
    let response = await axios.get(`${userEndpoint}?id=${userId}`);
    let user = await response.data;

    setUser(user);
  }

  async function fetchTweets() {
    let tweetsResponse = await axios.get(
      `${tweetsEndpoint}?username=${user.twitterHandle}&count=5`
    );
    let tweets = await tweetsResponse.data;
    setTweets(tweets);
  }

  const appComponent = (
    <div className="App">
      <header className="App-header">
        <div className="columns card">
          <div className="column is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src={tweets.length > 0 ? tweets[0].user.profile_image_url : ""}
                alt="Profile image"
              />
            </figure>
            <div>
              <p className="title">{user.name}</p>
            </div>
            <div>
              <p className="subtitle">@{user.twitterHandle}</p>
            </div>
            <div className="is-size-5">{user.workExperience}</div>
          </div>
          <div className="column">
            <p className="title">Tweets</p>
            <Tweets tweets={tweets} />
          </div>
        </div>
      </header>
    </div>
  );

  const failedComponent = (
    <div className="App">
      <header className="App-header">User not found on the database</header>
    </div>
  );

  return tweets.length > 0 ? appComponent : failedComponent;
}

export default App;
