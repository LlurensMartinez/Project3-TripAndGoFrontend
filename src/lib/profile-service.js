import axios from 'axios';

class ProfileService {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }
  // Llama a la Api para editar los datos del usuario
  edit(data) {
    const { name, username, password, newPassword, phoneNumber, imageURL } = data;
    
    return this.profile.put(`/profile/edit`, { name, username, password, newPassword, phoneNumber, imageURL })
      .then(({ data }) => data);
  }
  // Llama a la Api para recoger los datos del usuario
  getProfile() {
    return this.profile.get(`/profile`)
      .then(({ data }) => data);
  }
}
const profileService = new ProfileService();

export default profileService;