import react from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteBtn({ onClick }) {
    return (
        <button onClick={onClick}>
            <DeleteIcon />
        </button>
    );
}

export default DeleteBtn;
