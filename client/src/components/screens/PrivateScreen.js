import {useState, useEffect} from 'react';
import axios from 'axios';

const PrivateScreen = ({history}) => {
    const[error, setError] = useState("");
    const[privateData, setPrivateData] = useState("");
    const user = JSON.parse(localStorage.getItem("authToken"))

    console.log(localStorage)

    useEffect(() => {
        if(!localStorage.getItem("authToken")) {
            history.push("/login")
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }

            try {
                const {data} = await axios.get("/api/private", config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login")
            }
        }

        fetchPrivateData();
    }, [history])

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }
    
    return error ? (
        <span className="error-message">{error}</span> 
        ) : (
        <>
        <p>{user.result.username}</p>
        <button onClick={logoutHandler}>Logout</button>
        </>
    );
};

export default PrivateScreen;