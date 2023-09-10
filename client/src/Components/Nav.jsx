import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import '../Styles/navbar.css'
const Nav = ({Toggle}) => {

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-transparent px-3">
            <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <i className='bi bi-justify'></i>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <ul class="nav navbar-nav">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Profile</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Logout</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Messages</a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">Profile</a>
                            <a href="#" class="dropdown-item">Budget</a>
                            <a href="#" class="dropdown-item">Logout</a>
                            <div class="dropdown-divider"></div>
                            <a href="#"class="dropdown-item">Trash</a>
                        </div>
                    </li>
                </ul>
                </ul>
            </div>
        </nav>)
}

export default Nav