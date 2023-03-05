import { useEffect, useState } from "react";
import { TagItem, useAppContext } from "../AppContext";
import {
  Tag,
  useDetachUsersMutation,
  useGetTagsQuery,
  useTagAddedSubscription,
  useUpdateUsersMutation,
} from "../graphql/generated/schema";
import { ListOfTagsWithChecks } from "./ListOfTagsWithChecks";
import { TagInput } from "./TagInput";

export const LeftSection = () => {
  // const { state, dispatch } = useAppContext();

  // const [updateUsers] = useUpdateUsersMutation();
  // const [detachUsers] = useDetachUsersMutation();

  // const sub = useTagAddedSubscription();
  // const dataSub = sub.data;

  // useEffect(() => {
  //   if (!dataSub?.tagAdded) return;
  //   setTags([...tags, dataSub.tagAdded as Tag]);
  // }, [dataSub]);

  // const { data, loading, error } = useGetTagsQuery();
  // const [tags, setTags] = useState([] as Tag[]);

  // useEffect(() => {
  //   if (!data?.tags) return;
  //   setTags(data?.tags as Tag[]);
  // }, [data]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  // const onChecked = async (props: TagItem) => {
  //   console.log(props);
  //   if (!props || !props.name) {
  //     return;
  //   }

  // if (props.value) {
  //   await updateUsers({
  //     variables: {
  //       userName: state.name,
  //       technologyName: props.name,
  //     },
  //   });
  // } else {
  //   await detachUsers({
  //     variables: {
  //       userName: state.name,
  //       technologyName: props.name,
  //     },
  //   });
  // }
  // getFriends({
  //   variables: {
  //     userName: user.name,
  //   },
  // });
  // };

  return (
    <div className="block has-background-white">
      <div className="panel is-info">
        <p className="panel-heading">List of Tags</p>
        <TagInput />
        <ListOfTagsWithChecks />
      </div>
    </div>
  );
};
