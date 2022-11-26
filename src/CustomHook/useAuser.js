import { useEffect, useState } from "react"

export const useAuser = (email, joinfrom) => {
    const [user, setUser] = useState('');
    useEffect(() => {
        if (email && joinfrom) {
            fetch(`${process.env.REACT_APP_server_url}/users?email=${email}&joinfrom=${joinfrom}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setUser(data);
                })
        }
    }, [email, joinfrom])
    return user;
}