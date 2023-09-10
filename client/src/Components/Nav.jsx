import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import '../Styles/navbar.css'
const Nav = ({ Toggle }) => {

    return (
        <nav className="navbar navbar-expand-sm px-3 border-bottom">
            <button className="btn" type="button" data-bs-theme='dark' onClick={Toggle}>
                <span className="navbar-toggler-icon"></span>
            </button>


            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <i className='bi bi-justify'></i>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                    <ul class="nav navbar-nav">
                        <li class="nav-item rounded">
                            <a href="/profile" class="nav-link"><i className="bi bi-house pe-2"></i><span>
                                Profile
                            </span></a>
                        </li>
                        <li class="nav-item rounded">
                            <a href="/logout" class="nav-link"><i className="bi bi-power pe-2"></i><span>Logout</span></a>
                        </li>
                    </ul>
                </ul>
            </div>

        </nav>

    )
}

export default Nav