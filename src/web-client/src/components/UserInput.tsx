import { FC, useEffect, useState } from 'react';
import { useUserLazyQuery, useCreateUsersMutation } from '../graphql/generated/schema';
import axios from 'axios';
import { config } from '../config';

export const UserInput: FC<{ onUserDefined: (name: string, image: string) => void }> = ({ onUserDefined }) => {

    const [name, setName] = useState("");
    const [isAddDisabled, setIsAddDisabled] = useState(true);
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
        setIsAddDisabled(true);
        axios.get(`https://api.github.com/users/${name}`, config)
            .then(res => {
                if (!res || !res.data) {
                    setIsAddDisabled(true);
                    return;
                }
                onUserDefined(name, res.data.avatar_url);
                if (!!data && data?.users?.length === 0) {
                    setIsAddDisabled(false);
                    return;
                }
            })
            .catch(_ => {
                setIsAddDisabled(true);
            });

    }, [data]);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value;
        setName(val);
    };

    const handleClick = async () => {
        if (isAddDisabled) {
            return;
        }
        createUser({ variables: { userName: name } });
        setIsAddDisabled(true);
    };

    return (
        <div>
            <p>Enter your Github account (user name)</p>
            <input type="text" value={name} onChange={handleChange} placeholder="Gihub account" />
            <button onClick={handleClick} disabled={isAddDisabled}>Add User</button>
        </div>
    );
};