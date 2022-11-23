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

export const TagsWithInputWithSubWithChecks: React.FC = () => {

  const sub = useTagAddedSubscription();
  const dataSub = sub.data;

  const { data, loading, error } = useGetTagsQuery();
  const [tags, setTags] = useState([] as Tag[]);

  const [userName, setUserName] = useState("");
  const [updateUsers, updateResult] = useUpdateUsersMutation();
  const [detachUsers, detachResult] = useDetachUsersMutation();

  const [getFriends, friendsResult] = useGetFriendsLazyQuery({ nextFetchPolicy: 'no-cache', fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (!data?.tags) return;
    setTags(data.tags as Tag[]);
  }, [data]);

  useEffect(() => {
    if (!dataSub?.tagAdded) return;
    setTags([...tags, dataSub.tagAdded as Tag]);
  }, [dataSub]);

  const onUserNameDefined = (name: string) => {
    if (!!name) {
      setUserName(name);
    }
  };

  const onChecked = (name: string, isChecked: boolean) => {
    console.log(userName);
    if (!userName) {
      return;
    }

    if (isChecked) {
      updateUsers({
        variables: {
          userName: userName,
          technologyName: name
        }
      }).then(() => {
        getFriends({
          variables: {
            userName: userName
          }
        });
      });
    } else {
      detachUsers({
        variables: {
          userName: userName,
          technologyName: name
        }
      }).then(() => {
        getFriends({
          variables: {
            userName: userName
          }
        });
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (<div>
    <UserInput {...{ onUserNameDefined }} />
    <TagInput />
    <ListOfTagsWithChecks {...{ tags, onChecked }} />
    {/* <p>{updateResult?.data?.updateUsers?.info?.relationshipsCreated}</p>
    <p>{detachResult?.data?.updateUsers?.info?.relationshipsDeleted}</p> */}
    <p>{friendsResult?.data?.users?.flatMap(x => x.technologies.flatMap(y => y.users)).flatMap(z => z.name)}</p>
  </div>);
};