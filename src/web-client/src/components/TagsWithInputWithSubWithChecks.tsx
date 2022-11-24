import React, { useEffect, useState } from 'react';
import {
  Tag,
  useGetTagsQuery,
  useTagAddedSubscription,
  useUpdateUsersMutation,
  useDetachUsersMutation,
  useGetFriendsLazyQuery
} from '../graphql/generated/schema';
import { TagInput } from './TagInput';
import { ListOfTagsWithChecks } from './ListOfTagsWithChecks';
import { UserInput } from './UserInput';
import axios from 'axios';
import { config } from '../config';

export const TagsWithInputWithSubWithChecks: React.FC = () => {

  const sub = useTagAddedSubscription();
  const dataSub = sub.data;

  const { data, loading, error } = useGetTagsQuery();
  const [tags, setTags] = useState([] as Tag[]);

  const [user, setUser] = useState({ name: "", image: "" });
  const [friends, setFriends] = useState([] as ({ name: string, image: string } | null)[]);
  const [updateUsers] = useUpdateUsersMutation();
  const [detachUsers] = useDetachUsersMutation();

  const [getFriends, friendsResult] = useGetFriendsLazyQuery({ nextFetchPolicy: 'no-cache', fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (!data?.tags) return;
    setTags(data.tags as Tag[]);
  }, [data]);

  useEffect(() => {
    if (!dataSub?.tagAdded) return;
    setTags([...tags, dataSub.tagAdded as Tag]);
  }, [dataSub]);

  const onUserDefined = (name: string, image: string) => {
    if (!!name) {
      setUser({ name, image });
    }
  };

  useEffect(() => {
    const names = friendsResult?.data?.users?.flatMap(x => x.technologies.flatMap(y => y.users))
      .flatMap(z => z.name)
      .filter((v, i, a) => a.indexOf(v) === i);

    const items = names?.map(async (name) => {
      const res = await axios.get(`https://api.github.com/users/${name}`, config);
      return res && res?.data ? { name, image: res.data.avatar_url as string } : null;
    });
    if (items) {
      Promise.all(items).then((res) => {
        if (res) {
          setFriends(res);
        }
      })
    }
  }, [friendsResult])

  const onChecked = async (name: string, isChecked: boolean) => {
    console.log(user);
    if (!user || !user.name) {
      return;
    }

    if (isChecked) {
      await updateUsers({
        variables: {
          userName: user.name,
          technologyName: name
        }
      });
    } else {
      await detachUsers({
        variables: {
          userName: user.name,
          technologyName: name
        }
      });
    }
    getFriends({
      variables: {
        userName: user.name
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (<div>
    <UserInput {...{ onUserDefined }} />
    <TagInput />
    <ListOfTagsWithChecks {...{ tags, onChecked }} />
    {user && user?.image ? <><h5>You:</h5><img src={user.image} alt={user.name} title={user.name} style={{ width: 100 }} /></> : null}
    {friends && friends?.length > 0 ? <><h5>Friends by Technologies:</h5>{friends.map(friend => <img src={friend?.image} alt={friend?.name} title={friend?.name} style={{ width: 100, marginRight: 50 }} />)}</> : null}
  </div>);
};