import { connect } from 'react-redux'
import CreatePlan from "../../components/map/CreatePlan";
import * as actions from "../../actions/actions/createPlan";
const mapStateToProps=(state)=>{
    return {
        store:state.plan
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addSource: (data,type) => dispatch(actions.addSource(data,type))
    };
 };
export default connect(mapStateToProps,mapDispatchToProps)(CreatePlan);