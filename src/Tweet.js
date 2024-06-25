import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';
import awsExports from './aws-exports';
import { listTweets } from './graphql/queries';
import { createTweet } from './graphql/mutations';

Amplify.configure(awsExports);

const Tweet = () => {
  const [tweets, setTweets] = useState([]);
  const [formState, setFormState] = useState({ text: '', author: '' });

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = async () => {
    try {
      const tweetData = await GraphQLAPI.graphql(graphqlOperation(listTweets));
      const tweets = tweetData.data.listTweets.items;
      setTweets(tweets);
    } catch (err) {
      console.log('error fetching tweets', err);
    }
  };

  const createNewTweet = async () => {
    if (!formState.text || !formState.author) return;
    const tweet = { ...formState };
    try {
      const result = await GraphQLAPI.graphql(graphqlOperation(createTweet, { input: tweet }));
      setTweets([...tweets, result.data.createTweet]);
      setFormState({ text: '', author: '' });
    } catch (err) {
      console.log('error creating tweet:', err);
    }
  };

  return (
    <div>
      <h2>Tweets</h2>
      <input
        onChange={e => setFormState({ ...formState, text: e.target.value })}
        placeholder="Tweet text"
        value={formState.text}
      />
      <input
        onChange={e => setFormState({ ...formState, author: e.target.value })}
        placeholder="Author"
        value={formState.author}
      />
      <button onClick={createNewTweet}>Create Tweet</button>
      {
        tweets.map((tweet, index) => (
          <div key={index}>
            <h3>{tweet.text}</h3>
            <p>Author: {tweet.author}</p>
            <p>Created At: {new Date(tweet.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(tweet.updatedAt).toLocaleString()}</p>
          </div>
        ))
      }
    </div>
  );
};

export default Tweet;
