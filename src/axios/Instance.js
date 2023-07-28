import axios from "axios"

const baseURL = 'https://fyp2-server.herokuapp.com/'
const testURL = 'http://localhost:5000/'

const instance = axios.create({ baseURL: testURL });

export {instance}