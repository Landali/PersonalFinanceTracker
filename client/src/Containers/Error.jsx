import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../Context/globalContext';
const Error = () => {
    const navigate = useNavigate()
    console.log('navigate', navigate)
    const { logOut } = useGlobalContext();
    const returntoSignIn = () => {
        logOut()
        navigate('/')
    }
    return (
        <div className='col-md-11 mx-auto center-block' >
            <div className="p-3 bg-dark bg-gradient bg-opacity-75 shadow-sm d-flex justify-content-around align-items-center rounded">
                <div className='col-md-8 mx-auto center-block'>
                    <div className='col-3'>
                        <img src='https://www.nicepng.com/png/full/282-2820041_oops-something-went-wrong-circle.png' onClick={returntoSignIn}></img>

                    </div>
                    <h1 id='error-warn' className='display-3 f-3'>Something went wrong! Please click the image to return to login</h1>
                </div>
            </div>
        </div>
    )
}

export default Error