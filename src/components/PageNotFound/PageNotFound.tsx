import styles from "./PageNotFound.module.css"
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {Path} from "../../common/routing/Routing";

export const PageNotFound = () => {
    const navigate = useNavigate();

    const onReturnClick = () => {
        navigate(Path.Login);
    };

    return (
        <div className={styles.pageNotFoundWrapper}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>page not found</h2>
            <Button variant="contained" color="primary" onClick={onReturnClick}>
                Return to main page
            </Button>
        </div>
    )
}
