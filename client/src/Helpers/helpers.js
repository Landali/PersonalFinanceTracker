// Local helpers
import axios from 'axios'


const BASE_URL = "http://localhost:3001";


export const fetchData = async (key) => {
    // Do axios call
    const response = await axios.get(`${BASE_URL}/user/dash`)
.catch((err) =>{
    console.log('Error fetching Dashboard data')
})
    return { username: 'Allan', data: response.data }
}