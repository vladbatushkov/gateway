import { FC, useEffect, useState } from "react";
import {
  useUserLazyQuery,
  useCreateUsersMutation,
  Technology,
  User,
} from "../graphql/generated/schema";
import axios from "axios";
import { UserInfo, useAppContext, Types } from "../AppContext";

export const UserInput: FC = () => {
  const { state, dispatch } = useAppContext();
  const [account, setAccount] = useState("");
  const [token, setToken] = useState(
    "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"
  );
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  const [createUser] = useCreateUsersMutation();
  const [getUser, { loading, error, data }] = useUserLazyQuery({
    nextFetchPolicy: "no-cache",
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    const getData = setTimeout(async () => {
      if (account) {
        await getUser({
          variables: {
            userAccount: account,
          },
        });
      }
    }, 500);
    return () => clearTimeout(getData);
  }, [account]);

  useEffect(() => {
    if (!account || !token) return;
    setIsAddDisabled(true);
    axios
      .get(`https://api.github.com/users/${account}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (!res || !res.data) {
          setIsAddDisabled(true);
          return;
        }
        const user = (data?.users[0] as User) ?? {};
        dispatch({
          type: Types.SetupUserInfo,
          payload: {
            userInfo: {
              account: res.data.login,
              name: res.data.name,
              image:
                res.data.avatar_url ??
                "https://bulma.io/images/placeholders/480x480.png",
              bio: res.data.bio ?? "Software Engineer",
              technologies: user.technologies?.map(
                (x: Technology) => x.name
              ) ?? ["Anything", "Everything"],
            },
          },
        });

        if (!!data && data?.users?.length === 0) {
          setIsAddDisabled(false);
          return;
        }
      })
      .catch((_) => {
        setIsAddDisabled(true);
      });
  }, [data]);

  const handleAccountChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setAccount(val);
  };

  const handleTokenChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setToken(val);
  };

  const handleClick = async () => {
    if (isAddDisabled) {
      return;
    }
    await createUser({
      variables: {
        userAccount: state.userInfo.account,
        userName: state.userInfo.name,
        userImage: state.userInfo.image,
        userBio: state.userInfo.bio,
      },
    });
    setIsAddDisabled(true);
  };

  return (
    <div className="box">
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Github Token</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                value={token}
                onChange={handleTokenChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Github Account</label>
        </div>
        <div className="field-body">
          <div className="field has-addons">
            <p className="control">
              <input
                className="input"
                type="text"
                value={account}
                onChange={handleAccountChange}
              />
            </p>
            <p className="control">
              <button
                onClick={handleClick}
                disabled={isAddDisabled}
                className={`button is-info is-fullwidth ${
                  loading ? "is-loading" : ""
                }`}
              >
                Add User
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
