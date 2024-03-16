import Breadcrumb from '../../components/Breadcrumb';


const ClaimsPage = () =>{

    return(

        <>
           <Breadcrumb pageName="Claims" />
           <div className="sidebar">
        <form>
          <div className="form-group">
            <label htmlFor="label1">Proposer Code</label>
            <input type="text" id="label1" name="label1" />
          </div>

          <div className="form-group">
            <label htmlFor="label2">Company Name</label>
            <input type="text" id="label2" name="label2" />
          </div>

          <div className="form-group">
            <label htmlFor="label3">Profile Name</label>
            <input type="text" id="label3" name="label3" />
          </div>

          <button type="submit">Search</button>
        </form>
      </div>
        </>
    );
}

export default ClaimsPage;