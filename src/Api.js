import axios from 'axios';

const API_KEY = '32339198-7844e9f2fb13c7b76cc83062c';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

export default fetchImages;
