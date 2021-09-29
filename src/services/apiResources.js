import axios from 'axios';

const url = 'https://pixabay.com/api/?key=15089766-5bf9896a3416c7dcc335047dc&q=anime&image_type=photo&pretty=true';
// data.hits[0].webformatURL
const getImages = async () => {
  const response = await axios.get(url);
  const { data } = response;
  const images = [];
  data.hits.map((image) => images.push(
    {
      url: image.webformatURL,
    },
  ));
  return images;
};

export default getImages;
