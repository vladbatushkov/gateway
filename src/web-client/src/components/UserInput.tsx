import { FC, useEffect, useState } from 'react';
import { useUserLazyQuery, useCreateUsersMutation } from '../graphql/generated/schema';

export const UserInput: FC<{ onUserNameDefined: (name: string) => void }> = ({ onUserNameDefined }) => {

    const [name, setName] = useState("");
    const [userStatus, setUserStatus] = useState(true);
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
                onUserNameDefined(name);
            }
        }, 500);
        return () => clearTimeout(getData);
    }, [name]);

    useEffect(() => {
        if (!!data && data?.users?.length === 0) {
            setUserStatus(false);
            return;
        }
        setUserStatus(true);
    }, [data]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        setName(val);
    };

    const handleClick = () => {
        if (!userStatus) {
            createUser({ variables: { userName: name } });
            setUserStatus(true);
        }
    };

    return (
        <div>
            <p>Enter your github account (user name)</p>
            <input type="text" value={name} onChange={handleChange} placeholder="Search user name" />
            <button onClick={handleClick} disabled={userStatus}>Create User</button>
        </div>
    );
};