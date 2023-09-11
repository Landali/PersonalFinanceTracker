import { useNavigate } from 'react-router-dom';
const Error = () => {
    const navigate = useNavigate()
    console.log('navigate', navigate)
    return (
        <div>
            Error
            <button onClick={()=> navigate(-1) }>Go back</button>
        </div>
    )
}

export default Error