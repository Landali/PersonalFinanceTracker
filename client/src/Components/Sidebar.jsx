import '../Styles/sidebar.css'
const Sidebar = ({ signout, toggle, user, name }) => {
    return (
        <aside id='sidebar' className={toggle ? '' : 'collapsed'}>
            <div className='h-100'>
                <div className='sidebar-logo'>
                    <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
                    <span id='sidebar-username-tag' className="brand-name fs-4">{user}</span>
                    
                </div>
                <ul className='sidebar-nav'>
                    <li className='sidebar-header'>
                    <span id='sidebar-welcome-tag' className="brand-name">{ name? `Welcome ${name}` :'Welcome' }</span>
                    <hr></hr>
                    </li>
                    <li className='sidebar-item rounded'>
                        <a id='sidebar-profile-item' href='/profile' className='sidebar-link'>
                            <i className="bi bi-house pe-2"></i>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li className='sidebar-item rounded'>
                        <a id='sidebar-dashboard-item' href='/dashboard' className='sidebar-link'>
                            <i className="bi bi-speedometer2 pe-2"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li className='sidebar-item rounded'>
                        <a id='sidebar-budget-item' href='#' className='sidebar-link collapsed' data-bs-toggle='collapse' data-bs-target='#budgets' aria-expanded='false' aria-controls='budgets'>
                            <i className="bi bi-clipboard-data pe-2"></i>
                            <span>Budget</span>
                        </a>
                        <ul id='budgets' className='sidebar-dropdown list-unstyled collapse' data-bs-parent='#sidebar'>
                            <li id='sidebar-drop-item' className='sidebar-item rounded'>
                                <a id='sidebar-budget-item' href='/budgets' className='sidebar-link'>
                                    <span className='pe-2 fs-10'>Budgets</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className='sidebar-item'>
                        <a href='#' className='sidebar-link' onClick={signout}>
                            <i className="bi bi-power pe-2"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar