import { FC, useEffect, useState } from 'react';
import { useUserLazyQuery, useCreateUsersMutation } from '../graphql/generated/schema';

export const UserInput: FC = () => {

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [createUser] = useCreateUsersMutation();
    const [getUser, { loading, error, data }] = useUserLazyQuery({ nextFetchPolicy: 'no-cache', fetchPolicy: 'no-cache' });

    useEffect(() => {
        const getData = setTimeout(() => {
            if (name) {
                getUser({
                    variables: {
                        userName: name
                    }
                });
            }
        }, 500);
        return () => clearTimeout(getData);
    }, [name]);

    useEffect(() => {
        if (!!data && data?.users?.length === 0) {
            setUserName(name);
            return;
        }
        setUserName("");
    }, [data]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        setName(val);
    };

    const handleClick = () => {
        if (userName) {
            createUser({ variables: { userName: userName } });
            setUserName("");
        }
    };

    return (
        <div>
            <p>Enter a github account (user name)</p>
            <input type="text" value={name} onChange={handleChange} placeholder="Search user name" />
            <button onClick={handleClick} disabled={!userName}>Create User</button>
        </div>
    );
};