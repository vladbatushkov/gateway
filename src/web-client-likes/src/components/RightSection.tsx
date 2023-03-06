import React, { useEffect, useState } from "react";
import { useAppContext, UserInfo } from "../AppContext";
import { useGetFriendsLazyQuery } from "../graphql/generated/schema";
import { UserInput } from "./UserInput";

export const RightSection: React.FC = () => {
  const [friends, setFriends] = useState([] as UserInfo[]);
  const { state, dispatch } = useAppContext();
  const user = state.userInfo;

  const [getFriends, useGetFriendsLazyObject] = useGetFriendsLazyQuery({
    nextFetchPolicy: "no-cache",
    fetchPolicy: "no-cache",
  });
  const getFriendsLazyData = useGetFriendsLazyObject.data;
  const getFriendsLazyLoading = useGetFriendsLazyObject.loading;
  const getFriendsLazyError = useGetFriendsLazyObject.error;

  useEffect(() => {
    getFriends({
      variables: {
        userAccount: user.account,
      },
    });
  }, [user]);

  useEffect(() => {
    if (!getFriendsLazyData || !getFriendsLazyData?.users) return;
    const users = getFriendsLazyData.users.flatMap(
      (a) =>
        a.technologies?.flatMap(
          (b) =>
            b.users?.map((c) => ({
              account: c.account,
              name: c.name,
              image: c.image,
              bio: c.bio,
              technologies: c.technologies?.map((d) => d.name) ?? [],
            })) ?? []
        ) ?? []
    ) as UserInfo[];
    const uniqueUsers = users.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.account === value.account)
    );

    console.log(`FRIENDS: ${JSON.stringify(uniqueUsers)}`);
    setFriends(uniqueUsers);
  }, [getFriendsLazyData]);

  if (getFriendsLazyError)
    return <p>Fetch friends error! ${getFriendsLazyError.message}`</p>;

  return (
    <>
      <UserInput />
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-1by1">
                <img src={user.image} />
              </figure>
            </div>
            <div className="card-content has-background-danger-light">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{user.name}</p>
                  <p className="subtitle is-6">@{user.account}</p>
                </div>
              </div>

              <div className="content">{user.bio}</div>

              <div className="tags are-medium">
                {user.technologies?.map((x) => (
                  <span className="tag is-danger" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {getFriendsLazyLoading ? <>Loading...</> : null}
        {friends.map((x) => {
          if (!x) return null;
          return (
            <div className="column is-one-third" key={x.account}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-1by1">
                    <img src={x.image} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{x.name}</p>
                      <p className="subtitle is-6">@{x.account}</p>
                    </div>
                  </div>

                  <div className="content">{x.bio}</div>

                  <div className="tags are-medium">
                    {x.technologies?.map((y) => (
                      <span
                        className="tag is-link is-light"
                        key={`${x.account}_${y}`}
                      >
                        {y}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
