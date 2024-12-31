import React from 'react'

const CreateEmployee = () => {
    return (
        <div>
            <div>
                <h3 className='text-center py-4'>Create Employers</h3>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Department</label>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Department</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                        </select>

                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">EmployerNumber</label>
                        <input type="text" className="form-control" id="EmployerNumber" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputAddress" className="form-label">Frist Name</label>
                        <input type="text" className="form-control" id="PostNumber" name="FristName" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputAddress" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="PostNumber" name="LastName" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="inputAddress2" className="form-label">PhoneNumber</label>
                        <input type="text" className="form-control" id="Title" name='PhoneNumber' />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputAddress2" className="form-label">Email</label>
                        <input type="text" className="form-control" id="Title" name='Email' />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputAddress2" className="form-label">JobTitle</label>
                        <input type="text" className="form-control" id="Title" name='JobTitle' />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">Role</label>
                        <select id="Status" className="form-select" name='AccountStatus'>
                            <option selected>Account Role</option>
                            <option>Admin</option>
                            <option>User</option>
                        </select>
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label" name="CreatedAt">CreatedAt</label>
                        <input type="date" className="form-control" id="CreatedAt" name="CreatedAt" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label" name="CreatedAt">UpdatedAt</label>
                        <input type="date" className="form-control" id="CreatedAt" name="UpdatedAt" />
                    </div>


                    <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">Acount Status</label>
                        <select id="Status" className="form-select" name='AccountStatus'>
                            <option selected>Account Status</option>
                            <option>Reading</option>
                            <option>Off</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAddress2" className="form-label">ProfilePicture</label>
                        <input type="file" className='ProfilePicture ' id='ProfilePicture' />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAddress2" className="form-label">ProfilePicture</label>
                        <input type="file" className='ProfilePicture ' id='ProfilePicture' />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAddress2" className="form-label">ProfilePicture</label>
                        <input type="file" className='ProfilePicture ' id='ProfilePicture' />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Create Employers</button>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAddress2" className="form-label">ProfilePicture</label>
                        <input type="file" className='ProfilePicture ' id='ProfilePicture' />
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Create Employers</button>
                    </div>
                    <p>thank you your choice us</p>
                </form>

                <p>thank you your choice us</p>
            </div>

        </div>
    )
}

export default CreateEmployee
