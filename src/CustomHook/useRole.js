import { useEffect, useState } from "react"

export const useRole = (email, joinfrom) => {
    const [role, setRole] = useState('');
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    useEffect(() => {
        if (email && joinfrom) {
            fetch(`${process.env.REACT_APP_server_url}/users?email=${email}&joinfrom=${joinfrom}`)
                .then(res => res.json())
                .then(data => {
                    setRole(data.role);
                    setIsRoleLoading(false);
                })
        }
    }, [email, joinfrom])
    return [role, isRoleLoading];
}