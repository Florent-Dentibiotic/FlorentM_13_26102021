import { useEffect, useState } from 'react';

export default function useFetchUser(email, password) {
    const [error, setError] = useState(null);
    const [token, setData] = useState({});

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(
                    'http://localhost:3001/api/v1/user/login',
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    }
                );
                const { body } = await response.json();
                console.log(body.token);
                setData(body.token);
            } catch (err) {
                setError(err);
            }
        }
        fetchUser();
    }, [email, password]);

    return {
        error,
        token,
    };
}
