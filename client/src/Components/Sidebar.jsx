import '../Styles/sidebar.css'
const Sidebar = ({ toggle }) => {
    return (
        <aside id='sidebar' className={toggle ? '' : 'collapsed'}>
            <div className='h-100'>
                <div className='sidebar-logo'>
                    <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
                    <span id='sidebar-username-tag' className="brand-name fs-4">Landali</span>
                    
                </div>
                <ul className='sidebar-nav'>
                    <li className='sidebar-header'>
                    <span id='sidebar-welcome-tag' className="brand-name">Bienvenido: Allan Danilo Paz  D' Elia</span>
                    <hr></hr>
                    </li>
                    <li className='sidebar-item rounded'>
                        <a id='sidebar-profile-item' href='#' className='sidebar-link'>
                            <i className="bi bi-house pe-2"></i>
                            <span>Profile</span>
                        </a>
                    </li>
                    <li className='sidebar-item rounded'>
                        <a id='sidebar-dashboard-item' href='#' className='sidebar-link'>
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
                                <a id='sidebar-income-item' href='#' className='sidebar-link'>
                                    <span className='pe-2 fs-10'>Incomes</span>
                                </a>
                            </li>
                            <li id='sidebar-drop-item' className='sidebar-item rounded'>
                                <a id='sidebar-expense-item' href='#' className='sidebar-link'>
                                    <span>Expenses</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className='sidebar-item'>
                        <a href='#' className='sidebar-link'>
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