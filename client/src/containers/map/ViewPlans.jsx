import { connect } from 'react-redux'
import ViewPlans from "../../components/map/ViewPlans";
const mapStateToProps=(state)=>{
    return {
        store:state.plan
    }
}
export default connect(mapStateToProps,null)(ViewPlans);