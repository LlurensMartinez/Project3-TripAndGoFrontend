import axios from 'axios';

class CommentService {
  constructor() {
    this.comment = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  create(id,data) {
   
    const { text } = data;
    console.log(id)
    return this.comment.post(`/comment`, { id,text })
      .then(({ data }) => data);
  }

  // Llama a la Api para recoger todos los viajes
  // getAll() {
  //   return this.trip.get('/trip')
  //     .then(({ data }) => data);
  // }
}

const commentService = new CommentService();

export default commentService;