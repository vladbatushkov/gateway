import { userInfo } from "os";
import { FC, useEffect, useState } from "react";
import { TagItem, Types, useAppContext } from "../AppContext";
import {
  useDetachUsersMutation,
  useGetTagsLazyQuery,
  useTagAddedSubscription,
  useUpdateUsersMutation,
} from "../graphql/generated/schema";

export const ListOfTagsWithChecks = () => {
  const [updateUsers] = useUpdateUsersMutation();
  const [detachUsers] = useDetachUsersMutation();

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

  const checkHandler = async (current: TagItem) => {
    console.log(current);
    const nextState = { ...current, isChecked: !current.isChecked } as TagItem;

    if (!state.userInfo || !state?.userInfo?.name) {
      return;
    }

    var variables = {
      userName: state.userInfo.account,
      technologyName: nextState.name,
    };

    if (nextState.isChecked) {
      await updateUsers({ variables });
    } else {
      await detachUsers({ variables });
    }

    dispatch({
      type: Types.ToggleTag,
      payload: {
        item: nextState,
      },
    });
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
