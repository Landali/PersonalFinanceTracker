import '../Styles/sidebar.css'
const Sidebar = () => {

    return (
        <div className="bg-transparent sidebar p-2 rounded-2">
            <div className="m-2">
                <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
                <span className="brand-name fs-4">Allan</span>
            </div>
            <hr className="text-dark" />
            <div className="list-group list-group-flush">
            <a className="list-group-item py-2 bg-transparent" >
                <i className="bi bi-house fs-5 me-3"></i>
                <span >Home</span>
            </a>    
            <a className="list-group-item py-2 bg-transparent" >
                <i className="bi bi-people fs-5 me-3"></i>
                <span >Profile</span>
            </a>
            <a className="list-group-item py-2 bg-transparent" >
                <i className="bi bi-speedometer2 fs-5 me-3"></i>
                <span >Dashboard</span>
            </a>
            <a className="list-group-item py-2 bg-transparent" >
                <i className="bi bi-clipboard-data fs-5 me-3"></i>
                <span >Budgets</span>
            </a>
            <a className="list-group-item bg-transparent me-2" >
                <i className="col-auto bi bi-power fs-5 me-3"></i>
                <span className='col-auto'>Logout</span>
            </a>
            </div>
        </div>
    )
}

export default Sidebar