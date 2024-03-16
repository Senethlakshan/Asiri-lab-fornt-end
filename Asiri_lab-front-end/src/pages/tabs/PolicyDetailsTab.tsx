



const PolicyDetailsTab = () =>{

    return(

        <>
       
        <div className="acc-container">
      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="firstName">Proposer code</label>
          <input type="text" id="firstName" name="firstName"  />
        </div>

        <div className="form-row">
          <label htmlFor="lastName">Company Name</label>
          <input type="text" id="lastName" name="lastName"  />
        </div>

        <div className="form-row">
          <label htmlFor="lastName">Contact Number</label>
          <input type="text" id="lastName" name="lastName"  />
        </div>
      </div>
      

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="email">BR Number</label>
          <input type="text" id="email" name="email"  />
        </div>
        
        <div className="form-row">
          <label htmlFor="password">Profile Name</label>
          <input type="text" id="password" name="password"  />
        </div>
        <div className="form-row">
          <label htmlFor="password">Address</label>
          <input type="text" id="password" name="password"  />
        </div>
      </div>
    </div>
        </>

    );
}

export default PolicyDetailsTab;