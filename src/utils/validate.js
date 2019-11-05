import {URI} from 'react-native-dotenv';

export const validateImageUrl = image => {
  const isPrefix = new RegExp(/^(http|https)[://]/).test(image);
  let imageUrl = image;
  if (!isPrefix) {
    imageUrl = URI + image;
  }
  return imageUrl;
};