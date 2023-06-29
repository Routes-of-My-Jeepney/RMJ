import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/MapPage.scss";

function LoadingCircle({ loading }) {
    if (!loading) return null;

    return <CircularProgress className="loading-circle" />;
}

const mapStateToProps = (state) => ({
    loading: state.loading,
});

export default connect(mapStateToProps)(LoadingCircle); // connect()() is a higher order function
