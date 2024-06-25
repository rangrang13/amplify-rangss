/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateTweet = /* GraphQL */ `
  mutation UpdateTweet(
    $input: UpdateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    updateTweet(input: $input, condition: $condition) {
      id
      text
      author
      createdAt
      updatedAt
      __typename
    }
  }
`;


export const createTweet = /* GraphQL */ `
  mutation CreateTweet(
    $input: CreateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    createTweet(input: $input, condition: $condition) {
      id
      text
      author
      description
      image
      createdAt
      updatedAt
    }
  }
`;

export const deleteTweet = /* GraphQL */ `
  mutation DeleteTweet(
    $input: DeleteTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    deleteTweet(input: $input, condition: $condition) {
      id
      text
      author
      description
      image
      createdAt
      updatedAt
    }
  }
`;
