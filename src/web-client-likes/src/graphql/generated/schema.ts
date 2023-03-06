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
};

export type CreateInfo = {
  __typename?: 'CreateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
};

export type CreateTechnologiesMutationResponse = {
  __typename?: 'CreateTechnologiesMutationResponse';
  info: CreateInfo;
  technologies: Array<Technology>;
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
  addTag: TagPayload;
  createTechnologies: CreateTechnologiesMutationResponse;
  createUsers: CreateUsersMutationResponse;
  deleteTechnologies: DeleteInfo;
  deleteUsers: DeleteInfo;
  updateTechnologies: UpdateTechnologiesMutationResponse;
  updateUsers: UpdateUsersMutationResponse;
};


export type MutationAddTagArgs = {
  name: Scalars['String'];
};


export type MutationCreateTechnologiesArgs = {
  input: Array<TechnologyCreateInput>;
};


export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};


export type MutationDeleteTechnologiesArgs = {
  delete?: InputMaybe<TechnologyDeleteInput>;
  where?: InputMaybe<TechnologyWhere>;
};


export type MutationDeleteUsersArgs = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<UserWhere>;
};


export type MutationUpdateTechnologiesArgs = {
  connect?: InputMaybe<TechnologyConnectInput>;
  connectOrCreate?: InputMaybe<TechnologyConnectOrCreateInput>;
  create?: InputMaybe<TechnologyRelationInput>;
  delete?: InputMaybe<TechnologyDeleteInput>;
  disconnect?: InputMaybe<TechnologyDisconnectInput>;
  update?: InputMaybe<TechnologyUpdateInput>;
  where?: InputMaybe<TechnologyWhere>;
};


export type MutationUpdateUsersArgs = {
  connect?: InputMaybe<UserConnectInput>;
  connectOrCreate?: InputMaybe<UserConnectOrCreateInput>;
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
  technologies: Array<Technology>;
  technologiesAggregate: TechnologyAggregateSelection;
  technologiesConnection: TechnologiesConnection;
  users: Array<User>;
  usersAggregate: UserAggregateSelection;
  usersConnection: UsersConnection;
};


export type QueryTechnologiesArgs = {
  options?: InputMaybe<TechnologyOptions>;
  where?: InputMaybe<TechnologyWhere>;
};


export type QueryTechnologiesAggregateArgs = {
  where?: InputMaybe<TechnologyWhere>;
};


export type QueryTechnologiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<InputMaybe<TechnologySort>>>;
  where?: InputMaybe<TechnologyWhere>;
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
  tagAdded: Tag;
  userAdded: User;
};

export type Tag = {
  __typename?: 'Tag';
  name?: Maybe<Scalars['String']>;
};

export type TagPayload = {
  __typename?: 'TagPayload';
  tag: Tag;
};

export type TechnologiesConnection = {
  __typename?: 'TechnologiesConnection';
  edges: Array<TechnologyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type Technology = {
  __typename?: 'Technology';
  name: Scalars['String'];
  users: Array<User>;
  usersAggregate?: Maybe<TechnologyUserUsersAggregationSelection>;
  usersConnection: TechnologyUsersConnection;
};


export type TechnologyUsersArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<UserOptions>;
  where?: InputMaybe<UserWhere>;
};


export type TechnologyUsersAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<UserWhere>;
};


export type TechnologyUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<TechnologyUsersConnectionSort>>;
  where?: InputMaybe<TechnologyUsersConnectionWhere>;
};

export type TechnologyAggregateSelection = {
  __typename?: 'TechnologyAggregateSelection';
  count: Scalars['Int'];
  name: StringAggregateSelectionNonNullable;
};

export type TechnologyConnectInput = {
  users?: InputMaybe<Array<TechnologyUsersConnectFieldInput>>;
};

export type TechnologyConnectOrCreateInput = {
  users?: InputMaybe<Array<TechnologyUsersConnectOrCreateFieldInput>>;
};

export type TechnologyConnectOrCreateWhere = {
  node: TechnologyUniqueWhere;
};

export type TechnologyConnectWhere = {
  node: TechnologyWhere;
};

export type TechnologyCreateInput = {
  name: Scalars['String'];
  users?: InputMaybe<TechnologyUsersFieldInput>;
};

export type TechnologyDeleteInput = {
  users?: InputMaybe<Array<TechnologyUsersDeleteFieldInput>>;
};

export type TechnologyDisconnectInput = {
  users?: InputMaybe<Array<TechnologyUsersDisconnectFieldInput>>;
};

export type TechnologyEdge = {
  __typename?: 'TechnologyEdge';
  cursor: Scalars['String'];
  node: Technology;
};

export type TechnologyOnCreateInput = {
  name: Scalars['String'];
};

export type TechnologyOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more TechnologySort objects to sort Technologies by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TechnologySort>>;
};

export type TechnologyRelationInput = {
  users?: InputMaybe<Array<TechnologyUsersCreateFieldInput>>;
};

/** Fields to sort Technologies by. The order in which sorts are applied is not guaranteed when specifying many fields in one TechnologySort object. */
export type TechnologySort = {
  name?: InputMaybe<SortDirection>;
};

export type TechnologyUniqueWhere = {
  name?: InputMaybe<Scalars['String']>;
};

export type TechnologyUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<TechnologyUsersUpdateFieldInput>>;
};

export type TechnologyUserUsersAggregationSelection = {
  __typename?: 'TechnologyUserUsersAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<TechnologyUserUsersNodeAggregateSelection>;
};

export type TechnologyUserUsersNodeAggregateSelection = {
  __typename?: 'TechnologyUserUsersNodeAggregateSelection';
  account: StringAggregateSelectionNonNullable;
  bio: StringAggregateSelectionNonNullable;
  image: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type TechnologyUsersAggregateInput = {
  AND?: InputMaybe<Array<TechnologyUsersAggregateInput>>;
  NOT?: InputMaybe<TechnologyUsersAggregateInput>;
  OR?: InputMaybe<Array<TechnologyUsersAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<TechnologyUsersNodeAggregationWhereInput>;
};

export type TechnologyUsersConnectFieldInput = {
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean'];
  where?: InputMaybe<UserConnectWhere>;
};

export type TechnologyUsersConnectOrCreateFieldInput = {
  onCreate: TechnologyUsersConnectOrCreateFieldInputOnCreate;
  where: UserConnectOrCreateWhere;
};

export type TechnologyUsersConnectOrCreateFieldInputOnCreate = {
  node: UserOnCreateInput;
};

export type TechnologyUsersConnection = {
  __typename?: 'TechnologyUsersConnection';
  edges: Array<TechnologyUsersRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TechnologyUsersConnectionSort = {
  node?: InputMaybe<UserSort>;
};

export type TechnologyUsersConnectionWhere = {
  AND?: InputMaybe<Array<TechnologyUsersConnectionWhere>>;
  NOT?: InputMaybe<TechnologyUsersConnectionWhere>;
  OR?: InputMaybe<Array<TechnologyUsersConnectionWhere>>;
  node?: InputMaybe<UserWhere>;
};

export type TechnologyUsersCreateFieldInput = {
  node: UserCreateInput;
};

export type TechnologyUsersDeleteFieldInput = {
  delete?: InputMaybe<UserDeleteInput>;
  where?: InputMaybe<TechnologyUsersConnectionWhere>;
};

export type TechnologyUsersDisconnectFieldInput = {
  disconnect?: InputMaybe<UserDisconnectInput>;
  where?: InputMaybe<TechnologyUsersConnectionWhere>;
};

export type TechnologyUsersFieldInput = {
  connect?: InputMaybe<Array<TechnologyUsersConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<TechnologyUsersConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<TechnologyUsersCreateFieldInput>>;
};

export type TechnologyUsersNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TechnologyUsersNodeAggregationWhereInput>>;
  NOT?: InputMaybe<TechnologyUsersNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<TechnologyUsersNodeAggregationWhereInput>>;
  account_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']>;
  account_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']>;
  account_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']>;
  account_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']>;
  account_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']>;
  account_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  account_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  account_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  account_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  account_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
  account_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  account_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  account_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  account_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  account_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
  bio_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']>;
  bio_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']>;
  bio_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']>;
  bio_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']>;
  bio_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']>;
  bio_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  bio_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  bio_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  bio_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  bio_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
  bio_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  bio_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  bio_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  bio_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  bio_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
  image_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']>;
  image_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']>;
  image_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']>;
  image_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']>;
  image_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']>;
  image_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  image_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  image_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  image_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  image_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
  image_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  image_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  image_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  image_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  image_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
};

export type TechnologyUsersRelationship = {
  __typename?: 'TechnologyUsersRelationship';
  cursor: Scalars['String'];
  node: User;
};

export type TechnologyUsersUpdateConnectionInput = {
  node?: InputMaybe<UserUpdateInput>;
};

export type TechnologyUsersUpdateFieldInput = {
  connect?: InputMaybe<Array<TechnologyUsersConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<TechnologyUsersConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<TechnologyUsersCreateFieldInput>>;
  delete?: InputMaybe<Array<TechnologyUsersDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<TechnologyUsersDisconnectFieldInput>>;
  update?: InputMaybe<TechnologyUsersUpdateConnectionInput>;
  where?: InputMaybe<TechnologyUsersConnectionWhere>;
};

export type TechnologyWhere = {
  AND?: InputMaybe<Array<TechnologyWhere>>;
  NOT?: InputMaybe<TechnologyWhere>;
  OR?: InputMaybe<Array<TechnologyWhere>>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<Scalars['String']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
  usersAggregate?: InputMaybe<TechnologyUsersAggregateInput>;
  /** Return Technologies where all of the related TechnologyUsersConnections match this filter */
  usersConnection_ALL?: InputMaybe<TechnologyUsersConnectionWhere>;
  /** Return Technologies where none of the related TechnologyUsersConnections match this filter */
  usersConnection_NONE?: InputMaybe<TechnologyUsersConnectionWhere>;
  /** Return Technologies where one of the related TechnologyUsersConnections match this filter */
  usersConnection_SINGLE?: InputMaybe<TechnologyUsersConnectionWhere>;
  /** Return Technologies where some of the related TechnologyUsersConnections match this filter */
  usersConnection_SOME?: InputMaybe<TechnologyUsersConnectionWhere>;
  /** Return Technologies where all of the related Users match this filter */
  users_ALL?: InputMaybe<UserWhere>;
  /** Return Technologies where none of the related Users match this filter */
  users_NONE?: InputMaybe<UserWhere>;
  /** Return Technologies where one of the related Users match this filter */
  users_SINGLE?: InputMaybe<UserWhere>;
  /** Return Technologies where some of the related Users match this filter */
  users_SOME?: InputMaybe<UserWhere>;
};

export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  bookmark?: Maybe<Scalars['String']>;
  nodesCreated: Scalars['Int'];
  nodesDeleted: Scalars['Int'];
  relationshipsCreated: Scalars['Int'];
  relationshipsDeleted: Scalars['Int'];
};

export type UpdateTechnologiesMutationResponse = {
  __typename?: 'UpdateTechnologiesMutationResponse';
  info: UpdateInfo;
  technologies: Array<Technology>;
};

export type UpdateUsersMutationResponse = {
  __typename?: 'UpdateUsersMutationResponse';
  info: UpdateInfo;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  account: Scalars['String'];
  bio: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  technologies: Array<Technology>;
  technologiesAggregate?: Maybe<UserTechnologyTechnologiesAggregationSelection>;
  technologiesConnection: UserTechnologiesConnection;
};


export type UserTechnologiesArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  options?: InputMaybe<TechnologyOptions>;
  where?: InputMaybe<TechnologyWhere>;
};


export type UserTechnologiesAggregateArgs = {
  directed?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<TechnologyWhere>;
};


export type UserTechnologiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  directed?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Array<UserTechnologiesConnectionSort>>;
  where?: InputMaybe<UserTechnologiesConnectionWhere>;
};

export type UserAggregateSelection = {
  __typename?: 'UserAggregateSelection';
  account: StringAggregateSelectionNonNullable;
  bio: StringAggregateSelectionNonNullable;
  count: Scalars['Int'];
  image: StringAggregateSelectionNonNullable;
  name: StringAggregateSelectionNonNullable;
};

export type UserConnectInput = {
  technologies?: InputMaybe<Array<UserTechnologiesConnectFieldInput>>;
};

export type UserConnectOrCreateInput = {
  technologies?: InputMaybe<Array<UserTechnologiesConnectOrCreateFieldInput>>;
};

export type UserConnectOrCreateWhere = {
  node: UserUniqueWhere;
};

export type UserConnectWhere = {
  node: UserWhere;
};

export type UserCreateInput = {
  account: Scalars['String'];
  bio: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  technologies?: InputMaybe<UserTechnologiesFieldInput>;
};

export type UserDeleteInput = {
  technologies?: InputMaybe<Array<UserTechnologiesDeleteFieldInput>>;
};

export type UserDisconnectInput = {
  technologies?: InputMaybe<Array<UserTechnologiesDisconnectFieldInput>>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export type UserOnCreateInput = {
  account: Scalars['String'];
  bio: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
};

export type UserOptions = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
};

export type UserRelationInput = {
  technologies?: InputMaybe<Array<UserTechnologiesCreateFieldInput>>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  account?: InputMaybe<SortDirection>;
  bio?: InputMaybe<SortDirection>;
  image?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type UserTechnologiesAggregateInput = {
  AND?: InputMaybe<Array<UserTechnologiesAggregateInput>>;
  NOT?: InputMaybe<UserTechnologiesAggregateInput>;
  OR?: InputMaybe<Array<UserTechnologiesAggregateInput>>;
  count?: InputMaybe<Scalars['Int']>;
  count_GT?: InputMaybe<Scalars['Int']>;
  count_GTE?: InputMaybe<Scalars['Int']>;
  count_LT?: InputMaybe<Scalars['Int']>;
  count_LTE?: InputMaybe<Scalars['Int']>;
  node?: InputMaybe<UserTechnologiesNodeAggregationWhereInput>;
};

export type UserTechnologiesConnectFieldInput = {
  connect?: InputMaybe<Array<TechnologyConnectInput>>;
  /** Whether or not to overwrite any matching relationship with the new properties. Will default to `false` in 4.0.0. */
  overwrite?: Scalars['Boolean'];
  where?: InputMaybe<TechnologyConnectWhere>;
};

export type UserTechnologiesConnectOrCreateFieldInput = {
  onCreate: UserTechnologiesConnectOrCreateFieldInputOnCreate;
  where: TechnologyConnectOrCreateWhere;
};

export type UserTechnologiesConnectOrCreateFieldInputOnCreate = {
  node: TechnologyOnCreateInput;
};

export type UserTechnologiesConnection = {
  __typename?: 'UserTechnologiesConnection';
  edges: Array<UserTechnologiesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserTechnologiesConnectionSort = {
  node?: InputMaybe<TechnologySort>;
};

export type UserTechnologiesConnectionWhere = {
  AND?: InputMaybe<Array<UserTechnologiesConnectionWhere>>;
  NOT?: InputMaybe<UserTechnologiesConnectionWhere>;
  OR?: InputMaybe<Array<UserTechnologiesConnectionWhere>>;
  node?: InputMaybe<TechnologyWhere>;
};

export type UserTechnologiesCreateFieldInput = {
  node: TechnologyCreateInput;
};

export type UserTechnologiesDeleteFieldInput = {
  delete?: InputMaybe<TechnologyDeleteInput>;
  where?: InputMaybe<UserTechnologiesConnectionWhere>;
};

export type UserTechnologiesDisconnectFieldInput = {
  disconnect?: InputMaybe<TechnologyDisconnectInput>;
  where?: InputMaybe<UserTechnologiesConnectionWhere>;
};

export type UserTechnologiesFieldInput = {
  connect?: InputMaybe<Array<UserTechnologiesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserTechnologiesConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<UserTechnologiesCreateFieldInput>>;
};

export type UserTechnologiesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<UserTechnologiesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<UserTechnologiesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<UserTechnologiesNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']>;
};

export type UserTechnologiesRelationship = {
  __typename?: 'UserTechnologiesRelationship';
  cursor: Scalars['String'];
  node: Technology;
};

export type UserTechnologiesUpdateConnectionInput = {
  node?: InputMaybe<TechnologyUpdateInput>;
};

export type UserTechnologiesUpdateFieldInput = {
  connect?: InputMaybe<Array<UserTechnologiesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<UserTechnologiesConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<UserTechnologiesCreateFieldInput>>;
  delete?: InputMaybe<Array<UserTechnologiesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<UserTechnologiesDisconnectFieldInput>>;
  update?: InputMaybe<UserTechnologiesUpdateConnectionInput>;
  where?: InputMaybe<UserTechnologiesConnectionWhere>;
};

export type UserTechnologyTechnologiesAggregationSelection = {
  __typename?: 'UserTechnologyTechnologiesAggregationSelection';
  count: Scalars['Int'];
  node?: Maybe<UserTechnologyTechnologiesNodeAggregateSelection>;
};

export type UserTechnologyTechnologiesNodeAggregateSelection = {
  __typename?: 'UserTechnologyTechnologiesNodeAggregateSelection';
  name: StringAggregateSelectionNonNullable;
};

export type UserUniqueWhere = {
  account?: InputMaybe<Scalars['String']>;
};

export type UserUpdateInput = {
  account?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  technologies?: InputMaybe<Array<UserTechnologiesUpdateFieldInput>>;
};

export type UserWhere = {
  AND?: InputMaybe<Array<UserWhere>>;
  NOT?: InputMaybe<UserWhere>;
  OR?: InputMaybe<Array<UserWhere>>;
  account?: InputMaybe<Scalars['String']>;
  account_CONTAINS?: InputMaybe<Scalars['String']>;
  account_ENDS_WITH?: InputMaybe<Scalars['String']>;
  account_IN?: InputMaybe<Array<Scalars['String']>>;
  account_STARTS_WITH?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  bio_CONTAINS?: InputMaybe<Scalars['String']>;
  bio_ENDS_WITH?: InputMaybe<Scalars['String']>;
  bio_IN?: InputMaybe<Array<Scalars['String']>>;
  bio_STARTS_WITH?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  image_CONTAINS?: InputMaybe<Scalars['String']>;
  image_ENDS_WITH?: InputMaybe<Scalars['String']>;
  image_IN?: InputMaybe<Array<Scalars['String']>>;
  image_STARTS_WITH?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_CONTAINS?: InputMaybe<Scalars['String']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']>;
  name_IN?: InputMaybe<Array<Scalars['String']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']>;
  technologiesAggregate?: InputMaybe<UserTechnologiesAggregateInput>;
  /** Return Users where all of the related UserTechnologiesConnections match this filter */
  technologiesConnection_ALL?: InputMaybe<UserTechnologiesConnectionWhere>;
  /** Return Users where none of the related UserTechnologiesConnections match this filter */
  technologiesConnection_NONE?: InputMaybe<UserTechnologiesConnectionWhere>;
  /** Return Users where one of the related UserTechnologiesConnections match this filter */
  technologiesConnection_SINGLE?: InputMaybe<UserTechnologiesConnectionWhere>;
  /** Return Users where some of the related UserTechnologiesConnections match this filter */
  technologiesConnection_SOME?: InputMaybe<UserTechnologiesConnectionWhere>;
  /** Return Users where all of the related Technologies match this filter */
  technologies_ALL?: InputMaybe<TechnologyWhere>;
  /** Return Users where none of the related Technologies match this filter */
  technologies_NONE?: InputMaybe<TechnologyWhere>;
  /** Return Users where one of the related Technologies match this filter */
  technologies_SINGLE?: InputMaybe<TechnologyWhere>;
  /** Return Users where some of the related Technologies match this filter */
  technologies_SOME?: InputMaybe<TechnologyWhere>;
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


export type AddTagMutation = { __typename?: 'Mutation', addTag: { __typename?: 'TagPayload', tag: { __typename?: 'Tag', name?: string | null } } };

export type CreateUsersMutationVariables = Exact<{
  userAccount: Scalars['String'];
  userName: Scalars['String'];
  userImage: Scalars['String'];
  userBio: Scalars['String'];
}>;


export type CreateUsersMutation = { __typename?: 'Mutation', createUsers: { __typename?: 'CreateUsersMutationResponse', info: { __typename?: 'CreateInfo', nodesCreated: number } } };

export type UpdateUsersMutationVariables = Exact<{
  userAccount: Scalars['String'];
  technologyName: Scalars['String'];
}>;


export type UpdateUsersMutation = { __typename?: 'Mutation', updateUsers: { __typename?: 'UpdateUsersMutationResponse', info: { __typename?: 'UpdateInfo', nodesCreated: number, relationshipsCreated: number } } };

export type DetachUsersMutationVariables = Exact<{
  userAccount: Scalars['String'];
  technologyName: Scalars['String'];
}>;


export type DetachUsersMutation = { __typename?: 'Mutation', updateUsers: { __typename?: 'UpdateUsersMutationResponse', info: { __typename?: 'UpdateInfo', relationshipsDeleted: number } } };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', name?: string | null }> };

export type UserQueryVariables = Exact<{
  userAccount: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', account: string, name: string, image: string, bio: string, technologies: Array<{ __typename?: 'Technology', name: string }> }> };

export type GetRecommendationQueryVariables = Exact<{
  userAccount: Scalars['String'];
}>;


export type GetRecommendationQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', technologies: Array<{ __typename?: 'Technology', users: Array<{ __typename?: 'User', account: string, name: string, image: string, bio: string, technologies: Array<{ __typename?: 'Technology', name: string }> }> }> }> };

export type TagAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TagAddedSubscription = { __typename?: 'Subscription', tagAdded: { __typename?: 'Tag', name?: string | null } };


export const AddTagDocument = gql`
    mutation AddTag($name: String!) {
  addTag(name: $name) {
    tag {
      name
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTagMutation, AddTagMutationVariables>(AddTagDocument, options);
      }
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = Apollo.MutationResult<AddTagMutation>;
export type AddTagMutationOptions = Apollo.BaseMutationOptions<AddTagMutation, AddTagMutationVariables>;
export const CreateUsersDocument = gql`
    mutation CreateUsers($userAccount: String!, $userName: String!, $userImage: String!, $userBio: String!) {
  createUsers(
    input: {account: $userAccount, name: $userName, image: $userImage, bio: $userBio}
  ) {
    info {
      nodesCreated
    }
  }
}
    `;
export type CreateUsersMutationFn = Apollo.MutationFunction<CreateUsersMutation, CreateUsersMutationVariables>;

/**
 * __useCreateUsersMutation__
 *
 * To run a mutation, you first call `useCreateUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUsersMutation, { data, loading, error }] = useCreateUsersMutation({
 *   variables: {
 *      userAccount: // value for 'userAccount'
 *      userName: // value for 'userName'
 *      userImage: // value for 'userImage'
 *      userBio: // value for 'userBio'
 *   },
 * });
 */
export function useCreateUsersMutation(baseOptions?: Apollo.MutationHookOptions<CreateUsersMutation, CreateUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUsersMutation, CreateUsersMutationVariables>(CreateUsersDocument, options);
      }
export type CreateUsersMutationHookResult = ReturnType<typeof useCreateUsersMutation>;
export type CreateUsersMutationResult = Apollo.MutationResult<CreateUsersMutation>;
export type CreateUsersMutationOptions = Apollo.BaseMutationOptions<CreateUsersMutation, CreateUsersMutationVariables>;
export const UpdateUsersDocument = gql`
    mutation UpdateUsers($userAccount: String!, $technologyName: String!) {
  updateUsers(
    connectOrCreate: {technologies: {where: {node: {name: $technologyName}}, onCreate: {node: {name: $technologyName}}}}
    where: {account: $userAccount}
  ) {
    info {
      nodesCreated
      relationshipsCreated
    }
  }
}
    `;
export type UpdateUsersMutationFn = Apollo.MutationFunction<UpdateUsersMutation, UpdateUsersMutationVariables>;

/**
 * __useUpdateUsersMutation__
 *
 * To run a mutation, you first call `useUpdateUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsersMutation, { data, loading, error }] = useUpdateUsersMutation({
 *   variables: {
 *      userAccount: // value for 'userAccount'
 *      technologyName: // value for 'technologyName'
 *   },
 * });
 */
export function useUpdateUsersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsersMutation, UpdateUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsersMutation, UpdateUsersMutationVariables>(UpdateUsersDocument, options);
      }
export type UpdateUsersMutationHookResult = ReturnType<typeof useUpdateUsersMutation>;
export type UpdateUsersMutationResult = Apollo.MutationResult<UpdateUsersMutation>;
export type UpdateUsersMutationOptions = Apollo.BaseMutationOptions<UpdateUsersMutation, UpdateUsersMutationVariables>;
export const DetachUsersDocument = gql`
    mutation DetachUsers($userAccount: String!, $technologyName: String!) {
  updateUsers(
    disconnect: {technologies: {where: {node: {name: $technologyName}}}}
    where: {account: $userAccount}
  ) {
    info {
      relationshipsDeleted
    }
  }
}
    `;
export type DetachUsersMutationFn = Apollo.MutationFunction<DetachUsersMutation, DetachUsersMutationVariables>;

/**
 * __useDetachUsersMutation__
 *
 * To run a mutation, you first call `useDetachUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDetachUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [detachUsersMutation, { data, loading, error }] = useDetachUsersMutation({
 *   variables: {
 *      userAccount: // value for 'userAccount'
 *      technologyName: // value for 'technologyName'
 *   },
 * });
 */
export function useDetachUsersMutation(baseOptions?: Apollo.MutationHookOptions<DetachUsersMutation, DetachUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DetachUsersMutation, DetachUsersMutationVariables>(DetachUsersDocument, options);
      }
export type DetachUsersMutationHookResult = ReturnType<typeof useDetachUsersMutation>;
export type DetachUsersMutationResult = Apollo.MutationResult<DetachUsersMutation>;
export type DetachUsersMutationOptions = Apollo.BaseMutationOptions<DetachUsersMutation, DetachUsersMutationVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  tags {
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
export const UserDocument = gql`
    query User($userAccount: String!) {
  users(where: {account: $userAccount}) {
    account
    name
    image
    bio
    technologies {
      name
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userAccount: // value for 'userAccount'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const GetRecommendationDocument = gql`
    query GetRecommendation($userAccount: String!) {
  users(where: {account: $userAccount}) {
    technologies {
      users(where: {NOT: {account: $userAccount}}) {
        account
        name
        image
        bio
        technologies {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetRecommendationQuery__
 *
 * To run a query within a React component, call `useGetRecommendationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecommendationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecommendationQuery({
 *   variables: {
 *      userAccount: // value for 'userAccount'
 *   },
 * });
 */
export function useGetRecommendationQuery(baseOptions: Apollo.QueryHookOptions<GetRecommendationQuery, GetRecommendationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecommendationQuery, GetRecommendationQueryVariables>(GetRecommendationDocument, options);
      }
export function useGetRecommendationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecommendationQuery, GetRecommendationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecommendationQuery, GetRecommendationQueryVariables>(GetRecommendationDocument, options);
        }
export type GetRecommendationQueryHookResult = ReturnType<typeof useGetRecommendationQuery>;
export type GetRecommendationLazyQueryHookResult = ReturnType<typeof useGetRecommendationLazyQuery>;
export type GetRecommendationQueryResult = Apollo.QueryResult<GetRecommendationQuery, GetRecommendationQueryVariables>;
export const TagAddedDocument = gql`
    subscription TagAdded {
  tagAdded {
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TagAddedSubscription, TagAddedSubscriptionVariables>(TagAddedDocument, options);
      }
export type TagAddedSubscriptionHookResult = ReturnType<typeof useTagAddedSubscription>;
export type TagAddedSubscriptionResult = Apollo.SubscriptionResult<TagAddedSubscription>;