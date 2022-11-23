import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  UUID: any;
};

export type AddTagInput = {
  name: Scalars['String'];
};

export type AddTagPayload = {
  __typename?: 'AddTagPayload';
  tag?: Maybe<Tag>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTag: AddTagPayload;
};


export type MutationAddTagArgs = {
  input: AddTagInput;
};

export type Query = {
  __typename?: 'Query';
  tags: Array<Tag>;
};

export type Subscription = {
  __typename?: 'Subscription';
  tagAdded: Tag;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['UUID'];
  name: Scalars['String'];
};

export type AddTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddTagMutation = { __typename?: 'Mutation', addTag: { __typename?: 'AddTagPayload', tag?: { __typename?: 'Tag', id: any } | null } };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: any, name: string }> };

export type TagAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TagAddedSubscription = { __typename?: 'Subscription', tagAdded: { __typename?: 'Tag', id: any, name: string } };


export const AddTagDocument = gql`
    mutation AddTag($name: String!) {
  addTag(input: {name: $name}) {
    tag {
      id
    }
  }
}
    `;
export type AddTagMutationFn = Apollo.MutationFunction<AddTagMutation, AddTagMutationVariables>;

/**
 * __useAddTagMutation__
 *
 * To run a mutation, you first call `useAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagMutation, { data, loading, error }] = useAddTagMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddTagMutation(baseOptions?: Apollo.MutationHookOptions<AddTagMutation, AddTagMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddTagMutation, AddTagMutationVariables>(AddTagDocument, options);
}
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = Apollo.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = Apollo.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  tags {
    id
    name
  }
}
    `;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  console.log('gql-call');
  return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
}
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
}
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const TagAddedDocument = gql`
    subscription TagAdded {
  tagAdded {
    id
    name
  }
}
    `;

/**
 * __useTagAddedSubscription__
 *
 * To run a query within a React component, call `useTagAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTagAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTagAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TagAddedSubscription, TagAddedSubscriptionVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<TagAddedSubscription, TagAddedSubscriptionVariables>(TagAddedDocument, options);
}
export type TagAddedSubscriptionHookResult = ReturnType<typeof useTagAddedSubscription>;
export type TagAddedSubscriptionResult = Apollo.SubscriptionResult<TagAddedSubscription>;