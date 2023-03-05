import { userInfo } from "os";
import { FC, useEffect, useState } from "react";
import { TagItem, Types, useAppContext } from "../AppContext";
import {
  useGetTagsLazyQuery,
  useTagAddedSubscription,
} from "../graphql/generated/schema";

export const ListOfTagsWithChecks = () => {
  // const [updateUsers] = useUpdateUsersMutation();
  // const [detachUsers] = useDetachUsersMutation();

  const useTagAddedSubscriptionObject = useTagAddedSubscription();
  const useTagAddedData = useTagAddedSubscriptionObject.data;

  const [getTags, useGetTagsLazyObject] = useGetTagsLazyQuery({
    nextFetchPolicy: "no-cache",
    fetchPolicy: "no-cache",
  });
  const getTagsLazyData = useGetTagsLazyObject.data;
  const getTagsLazyLoading = useGetTagsLazyObject.loading;
  const getTagsLazyError = useGetTagsLazyObject.error;

  const { state, dispatch } = useAppContext();
  const tags = state.tags;

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    getTags();
  }, [useTagAddedData]);

  useEffect(() => {
    if (!getTagsLazyData || !getTagsLazyData?.tags) return;
    dispatch({
      type: Types.SetupTags,
      payload: {
        tags: getTagsLazyData?.tags.map((x) => x.name ?? "") ?? [],
        technologies: state?.userInfo?.technologies ?? [],
      },
    });
  }, [getTagsLazyData]);

  // useEffect(() => {
  //   const items = tags.map(
  //     (item: Tag) =>
  //       ({
  //         key: item.name,
  //         value: state.technologies.filter((x) => x == item.name).length > 0,
  //         name: item.name,
  //       } as ItemProps)
  //   );
  //   setChecks(items);
  // }, [tags, state]);

  const checkHandler = (current: TagItem) => {
    // const nextState = {
    //   value: !current.isChecked,
    //   name: current.name,
    // } as TagItem;
    // await updateUsers({
    //   variables: {
    //     userName: state.name,
    //     technologyName: props.name,
    //   },
    // });
    // dispatch({
    //   type: Types.AttachTag
    // })
  };

  if (getTagsLazyLoading) return <p>Loading...</p>;
  if (getTagsLazyError) return <p>Error: {getTagsLazyError?.message}</p>;

  const items = tags?.map((item) =>
    item ? (
      <label key={item.name} className="checkbox panel-block is-active">
        <input
          type="checkbox"
          checked={item.isChecked}
          onChange={() => checkHandler(item)}
        />
        {item.name}
      </label>
    ) : null
  );

  return <>{items}</>;
};
