import axios from "axios";

export default axios.create({
  baseURL: 'https://react-quiz-488a6-default-rtdb.firebaseio.com/'
})