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
  Name: any;
};

export type CreateInfo = {
  __typename?: 'CreateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
};

export type CreateTitlesMutationResponse = {
  __typename?: 'CreateTitlesMutationResponse';
  info: CreateInfo;
  titles: Array<Title>;
};

export type CreateUsersMutationResponse = {
  __typename?: 'CreateUsersMutationResponse';
  info: CreateInfo;
  users: Array<User>;
};

export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesDeleted: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTag: Tag;
  createTitles: CreateTitlesMutationResponse;
  createUsers: CreateUsersMutationResponse;
  deleteTitles: DeleteInfo;
  deleteUsers: DeleteInfo;
  updateTitles: UpdateTitlesMutationResponse;
  updateUsers: UpdateUsersMutationResponse;
};


export type MutationAddTagArgs = {
  tagName: Scalars['String'];
};


export type MutationCreateTitlesArgs = {
  input: Array<TitleCreateInput>;
};


export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};


export type MutationDeleteTitlesArgs = {
  delete?: InputMaybe<TitleDeleteInput>;
  where?: InputMaybe<TitleWhere>;
};


export type MutationDeleteUsersArgs = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<UserWhere>;
};


export type MutationUpdateTitlesArgs = {
  connect?: InputMaybe<TitleConnectInput>;
  create?: InputMaybe<TitleRelationInput>;
  delete?: InputMaybe<TitleDeleteInput>;
  disconnect?: InputMaybe<TitleDisconnectInput>;
  update?: InputMaybe<TitleUpdateInput>;
  where?: InputMaybe<TitleWhere>;
};


export type MutationUpdateUsersArgs = {
  connect?: InputMaybe<UserConnectInput>;
  create?: InputMaybe<UserRelationInput>;
  delete?: InputMaybe<UserDeleteInput>;
  disconnect?: InputMaybe<UserDisconnectInput>;
  update?: InputMaybe<UserUpdateInput>;
  where?: InputMaybe<UserWhere>;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  tags: Array<Tag>;
  titles: Array<Title>;
  titlesAggregate: TitleAggregateSelection;
  titlesConnection: TitlesConnection;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
};


export type QueryTitlesArgs = {
  options?: InputMaybe<TitleOptions>;
  where?: InputMaybe<TitleWhere>;
};


export type QueryTitlesAggregateArgs = {
  where?: InputMaybe<TitleWhere>;
};


export type QueryTitlesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<TitleSort>>>;
  where?: InputMaybe<TitleWhere>;
};


export type QueryUsersArgs = {
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
  where?: InputMaybe<UserWhere>;
};

export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC'
}

export type StringAggregateSelectionNonNullable = {
  __typename?: 'StringAggregateSelectionNonNullable';
  longest: Scalars['String'];
  shortest: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onTagAdded: Tag;
  titleAdded?: Maybe<Title>;
};


export type SubscriptionTitleAddedArgs = {
  titleID: Scalars['ID'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Title = {
  __typename?: 'Title';
  name: Scalars['String'];
  users: Array<User>;
  usersAggregate?: Maybe<TitleUserUsersAggregationSelection>;
  usersConnection: TitleUsersConnection;
};


export type TitleUsersArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type TitleUsersAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserWhere>;
};


export type TitleUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TitleUsersConnectionSort>>;
  where?: InputMaybe<TitleUsersConnectionWhere>;
};

export type TitleAggregateSelection = {
  __typename?: 'TitleAggregateSelection';
  count: Scalars['Int'];
  name: StringAggregateSelectionNonNullable;
};

export type TitleConnectInput = {
  users?: InputMaybe<Array<TitleUsersConnectFieldInput>>;
};

export type TitleConnectWhere = {
  node: TitleWhere;
};

export type TitleCreateInput = {
  name: Scalars['String'];
  users?: InputMaybe<TitleUsersFieldInput>;
};

export type TitleDeleteInput = {
  users?: InputMaybe<Array<TitleUsersDeleteFieldInput>>;
};

export type TitleDisconnectInput = {
  users?: InputMaybe<Array<TitleUsersDisconnectFieldInput>>;
};

export type TitleEdge = {
  __typename?: 'TitleEdge';
  cursor: Scalars['String'];
  node: Title;
};

export type TitleOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more TitleSort objects to sort Titles by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TitleSort>>;
};

export type TitleRelationInput = {
  users?: InputMaybe<Array<TitleUsersCreateFieldInput>>;
};

/** Fields to sort Titles by. The order in which sorts are applied is not guaranteed when specifying many fields in one TitleSort object. */
export type TitleSort = {
  name?: InputMaybe<SortDirection>;
};

export type TitleUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<TitleUsersUpdateFieldInput>>;
};

export type TitleUserUsersAggregationSelection = {
  __typename?: 'TitleUserUsersAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<TitleUserUsersNodeAggregateSelection>;
};

export type TitleUserUsersNodeAggregateSelection = {
  __typename?: 'TitleUserUsersNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
};

export type TitleUsersAggregateInput = {
  AND?: InputMaybe<Array<TitleUsersAggregateInput>>;
  OR?: InputMaybe<Array<TitleUsersAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<TitleUsersNodeAggregationWhereInput>;
};

export type TitleUsersConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>;
  where?: InputMaybe<UserConnectWhere>;
};

export type TitleUsersConnection = {
  __typename?: 'TitleUsersConnection';
  edges: Array<TitleUsersRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TitleUsersConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type TitleUsersConnectionWhere = {
  AND?: InputMaybe<Array<TitleUsersConnectionWhere>>;
  OR?: InputMaybe<Array<TitleUsersConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
  node_NOT?: InputMaybe<UserWhere>;
};

export type TitleUsersCreateFieldInput = {
  node: UserCreateInput;
};

export type TitleUsersDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<TitleUsersConnectionWhere>;
};

export type TitleUsersDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<TitleUsersConnectionWhere>;
};

export type TitleUsersFieldInput = {
  connect?: InputMaybe<Array<TitleUsersConnectFieldInput>>;
  create?: InputMaybe<Array<TitleUsersCreateFieldInput>>;
};

export type TitleUsersNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TitleUsersNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TitleUsersNodeAggregationWhereInput>>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  name_EQUAL?: InputMaybe<Scalars['String']>;
  name_GT?: InputMaybe<Scalars['Int']>;
  name_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  name_LT?: InputMaybe<Scalars['Int']>;
  name_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type TitleUsersRelationship = {
  __typename?: 'TitleUsersRelationship';
  cursor: Scalars['String'];
  node: User;
};

export type TitleUsersUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type TitleUsersUpdateFieldInput = {
  connect?: InputMaybe<Array<TitleUsersConnectFieldInput>>;
  create?: InputMaybe<Array<TitleUsersCreateFieldInput>>;
  delete?: InputMaybe<Array<TitleUsersDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<TitleUsersDisconnectFieldInput>>;
  update?: InputMaybe<TitleUsersUpdateConnectionInput>;
  where?: InputMaybe<TitleUsersConnectionWhere>;
};

export type TitleWhere = {
  AND?: InputMaybe<Array<TitleWhere>>;
  OR?: InputMaybe<Array<TitleWhere>>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT?: InputMaybe<Scalars['String']>;
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
  usersAggregate?: InputMaybe<TitleUsersAggregateInput>;
  usersConnection_ALL?: InputMaybe<TitleUsersConnectionWhere>;
  usersConnection_NONE?: InputMaybe<TitleUsersConnectionWhere>;
  usersConnection_SINGLE?: InputMaybe<TitleUsersConnectionWhere>;
  usersConnection_SOME?: InputMaybe<TitleUsersConnectionWhere>;
  /** Return Titles where all of the related Users match this filter */
  users_ALL?: InputMaybe<UserWhere>;
  /** Return Titles where none of the related Users match this filter */
  users_NONE?: InputMaybe<UserWhere>;
  /** Return Titles where one of the related Users match this filter */
  users_SINGLE?: InputMaybe<UserWhere>;
  /** Return Titles where some of the related Users match this filter */
  users_SOME?: InputMaybe<UserWhere>;
};

export type TitlesConnection = {
  __typename?: 'TitlesConnection';
  edges: Array<TitleEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  nodesDeleted: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type UpdateTitlesMutationResponse = {
  __typename?: 'UpdateTitlesMutationResponse';
  info: UpdateInfo;
  titles: Array<Title>;
};

export type UpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse';
  info: UpdateInfo;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  titles: Array<Title>;
  titlesAggregate?: Maybe<UserTitleTitlesAggregationSelection>;
  titlesConnection: UserTitlesConnection;
};


export type UserTitlesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<TitleOptions>;
  where?: InputMaybe<TitleWhere>;
};


export type UserTitlesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<TitleWhere>;
};


export type UserTitlesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserTitlesConnectionSort>>;
  where?: InputMaybe<UserTitlesConnectionWhere>;
};

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection';
  count: Scalars['Int'];
  name: StringAggregateSelectionNonNullable;
};

export type UserConnectInput = {
  titles?: InputMaybe<Array<UserTitlesConnectFieldInput>>;
};

export type UserConnectWhere = {
  node: UserWhere;
};

export type UserCreateInput = {
  name: Scalars['String'];
  titles?: InputMaybe<UserTitlesFieldInput>;
};

export type UserDeleteInput = {
  titles?: InputMaybe<Array<UserTitlesDeleteFieldInput>>;
};

export type UserDisconnectInput = {
  titles?: InputMaybe<Array<UserTitlesDisconnectFieldInput>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
};

export type UserRelationInput = {
  titles?: InputMaybe<Array<UserTitlesCreateFieldInput>>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  name?: InputMaybe<SortDirection>;
};

export type UserTitleTitlesAggregationSelection = {
  __typename?: 'UserTitleTitlesAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserTitleTitlesNodeAggregateSelection>;
};

export type UserTitleTitlesNodeAggregateSelection = {
  __typename?: 'UserTitleTitlesNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
};

export type UserTitlesAggregateInput = {
  AND?: InputMaybe<Array<UserTitlesAggregateInput>>;
  OR?: InputMaybe<Array<UserTitlesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserTitlesNodeAggregationWhereInput>;
};

export type UserTitlesConnectFieldInput = {
  connect?: InputMaybe<Array<TitleConnectInput>>;
  where?: InputMaybe<TitleConnectWhere>;
};

export type UserTitlesConnection = {
  __typename?: 'UserTitlesConnection';
  edges: Array<UserTitlesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserTitlesConnectionSort = {
  node?: InputMaybe<TitleSort>;
};

export type UserTitlesConnectionWhere = {
  AND?: InputMaybe<Array<UserTitlesConnectionWhere>>;
  OR?: InputMaybe<Array<UserTitlesConnectionWhere>>;
  node?: InputMaybe<TitleWhere>;
  node_NOT?: InputMaybe<TitleWhere>;
};

export type UserTitlesCreateFieldInput = {
  node: TitleCreateInput;
};

export type UserTitlesDeleteFieldInput = {
  delete?: InputMaybe<TitleDeleteInput>;
  where?: InputMaybe<UserTitlesConnectionWhere>;
};

export type UserTitlesDisconnectFieldInput = {
  disconnect?: InputMaybe<TitleDisconnectInput>;
  where?: InputMaybe<UserTitlesConnectionWhere>;
};

export type UserTitlesFieldInput = {
  connect?: InputMaybe<Array<UserTitlesConnectFieldInput>>;
  create?: InputMaybe<Array<UserTitlesCreateFieldInput>>;
};

export type UserTitlesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserTitlesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<UserTitlesNodeAggregationWhereInput>>;
  name_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LTE?: InputMaybe<Scalars['Float']>;
  name_EQUAL?: InputMaybe<Scalars['String']>;
  name_GT?: InputMaybe<Scalars['Int']>;
  name_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LTE?: InputMaybe<Scalars['Int']>;
  name_LT?: InputMaybe<Scalars['Int']>;
  name_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserTitlesRelationship = {
  __typename?: 'UserTitlesRelationship';
  cursor: Scalars['String'];
  node: Title;
};

export type UserTitlesUpdateConnectionInput = {
  node?: InputMaybe<TitleUpdateInput>;
};

export type UserTitlesUpdateFieldInput = {
  connect?: InputMaybe<Array<UserTitlesConnectFieldInput>>;
  create?: InputMaybe<Array<UserTitlesCreateFieldInput>>;
  delete?: InputMaybe<Array<UserTitlesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserTitlesDisconnectFieldInput>>;
  update?: InputMaybe<UserTitlesUpdateConnectionInput>;
  where?: InputMaybe<UserTitlesConnectionWhere>;
};

export type UserUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  titles?: InputMaybe<Array<UserTitlesUpdateFieldInput>>;
};

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>;
  OR?: InputMaybe<Array<UserWhere>>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT?: InputMaybe<Scalars['String']>;
  name_NOT_CONTAINS?: InputMaybe<Scalars['String']>;
  name_NOT_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_NOT_IN?: InputMaybe<Array<Scalars['String']>>;
  name_NOT_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
  titlesAggregate?: InputMaybe<UserTitlesAggregateInput>;
  titlesConnection_ALL?: InputMaybe<UserTitlesConnectionWhere>;
  titlesConnection_NONE?: InputMaybe<UserTitlesConnectionWhere>;
  titlesConnection_SINGLE?: InputMaybe<UserTitlesConnectionWhere>;
  titlesConnection_SOME?: InputMaybe<UserTitlesConnectionWhere>;
  /** Return Users where all of the related Titles match this filter */
  titles_ALL?: InputMaybe<TitleWhere>;
  /** Return Users where none of the related Titles match this filter */
  titles_NONE?: InputMaybe<TitleWhere>;
  /** Return Users where one of the related Titles match this filter */
  titles_SINGLE?: InputMaybe<TitleWhere>;
  /** Return Users where some of the related Titles match this filter */
  titles_SOME?: InputMaybe<TitleWhere>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AddTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddTagMutation = { __typename?: 'Mutation', addTag: { __typename?: 'Tag', id: number, name: string } };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: number, name: string }> };

export type OnTagAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnTagAddedSubscription = { __typename?: 'Subscription', onTagAdded: { __typename?: 'Tag', id: number, name: string } };


export const AddTagDocument = gql`
    mutation AddTag($name: String!) {
  addTag(tagName: $name) {
    id
    name
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
        const options = {...defaultOptions, ...baseOptions}
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const OnTagAddedDocument = gql`
    subscription onTagAdded {
  onTagAdded {
    id
    name
  }
}
    `;

/**
 * __useOnTagAddedSubscription__
 *
 * To run a query within a React component, call `useOnTagAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnTagAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnTagAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnTagAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnTagAddedSubscription, OnTagAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnTagAddedSubscription, OnTagAddedSubscriptionVariables>(OnTagAddedDocument, options);
      }
export type OnTagAddedSubscriptionHookResult = ReturnType<typeof useOnTagAddedSubscription>;
export type OnTagAddedSubscriptionResult = Apollo.SubscriptionResult<OnTagAddedSubscription>;