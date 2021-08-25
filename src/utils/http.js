import axios from 'axios';
import { apiKey } from '../config';

export const sendData = async (url, data) => {
  try {
    const response = await axios.post(url + apiKey, data);
    // console.log(response.data.idToken);
    return response.data.idToken;
  } catch (error) {
    console.log('Catch block');
    console.log(error.response.data.error.message);
    alert('Error: ' + error.response.data.error.message);

    return false;
  }
};

// panaudoti sendData AuthForm viduje

// prisiloginus, nunaviguoti i home page useHistory

// pakeitus slaptazodi naviguoti i home page

// prideti geresni UI klaidu ir sekmingu operaciju atvaizdavimui (toastify) maybe

// prideti geresni UI klaidu ir sekmingu operaciju atvaizdavimui (toastify? maybe

// headeryje prideti prisijungusio vartotojo email
