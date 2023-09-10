import '../Styles/profile.css'

const Profile = () => {

    return (
        <div className='col-md-6 mx-auto center-block' >
            <div className="p-3 bg-dark bg-gradient bg-opacity-75 shadow-sm d-flex justify-content-around align-items-center rounded">
                {/* Starts profile edit form*/}

                <form>
                    <div className='profile-logo'>
                        <i id='profile-icon' className="bi bi-person-circle me-3 fs-4"></i>
                        <span id='profile-title-tag' className="brand-name fs-4">General Information</span>
                        <hr />
                    </div>

                    <div className="mb-3">
                        <label id='profile-label' class="small mb-1" for="inputUsername">Username<span id='profile-lbl-description'> (how your name will appear to other users on the site)</span> </label>
                        <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="username" />
                    </div>

                    <div class="row gx-3 mb-3">

                        <div class="col-md-6">
                            <label id='profile-label' class="small mb-1" for="inputFirstName">First name</label>
                            <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="Allan" />
                        </div>

                        <div class="col-md-6">
                            <label id='profile-label' class="small mb-1" for="inputLastName">Last name</label>
                            <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Paz" />
                        </div>
                    </div>

                    <div class="mb-3">
                        <label id='profile-label' class="small mb-1" for="inputEmailAddress">Email address</label>
                        <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="name@example.com" />
                    </div>
                    <br />
                    <br />
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-outline-success overflow-auto" type="button"><i class="bi bi-check2-circle"></i>
                            <span id='profile-save-btn'>Save</span></button>
                        <button class="btn btn-outline-secondary overflow-auto" type="button"><i class="bi bi-x-circle"></i><span id='profile-clear-btn'>Clear</span></button>
                    </div>

                </form>
            </div>

        </div>

    )
}

export default Profile