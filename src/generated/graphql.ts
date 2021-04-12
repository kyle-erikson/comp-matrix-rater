import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Attributes = {
  __typename?: 'Attributes';
  name?: Maybe<Scalars['String']>;
  competency?: Maybe<Array<Maybe<Competency>>>;
};

export type BaseReport = {
  __typename?: 'BaseReport';
  key_areas?: Maybe<Array<Maybe<KeyAreas>>>;
};

export type Competency = {
  __typename?: 'Competency';
  description?: Maybe<Scalars['String']>;
  core?: Maybe<Scalars['Boolean']>;
};

export type KeyAreas = {
  __typename?: 'KeyAreas';
  name?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<Maybe<Attributes>>>;
};

export type Level = {
  __typename?: 'Level';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
};

export type Matrix = {
  __typename?: 'Matrix';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getMatrices?: Maybe<Array<Maybe<Matrix>>>;
  getLevels?: Maybe<Array<Maybe<Level>>>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  getReportsForUser?: Maybe<Array<Maybe<Report>>>;
  getBaseReportForUser?: Maybe<Array<Maybe<BaseReport>>>;
};


export type QueryGetLevelsArgs = {
  matrixId?: Maybe<Scalars['Int']>;
};


export type QueryGetUsersArgs = {
  managerId?: Maybe<Scalars['Int']>;
};


export type QueryGetReportsForUserArgs = {
  userId?: Maybe<Scalars['Int']>;
};


export type QueryGetBaseReportForUserArgs = {
  userId?: Maybe<Scalars['Int']>;
  matrixId?: Maybe<Scalars['Int']>;
};

export type Report = {
  __typename?: 'Report';
  id?: Maybe<Scalars['Int']>;
  matrix_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  manager_id?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Attributes: ResolverTypeWrapper<Attributes>;
  String: ResolverTypeWrapper<Scalars['String']>;
  BaseReport: ResolverTypeWrapper<BaseReport>;
  Competency: ResolverTypeWrapper<Competency>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  KeyAreas: ResolverTypeWrapper<KeyAreas>;
  Level: ResolverTypeWrapper<Level>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Matrix: ResolverTypeWrapper<Matrix>;
  Query: ResolverTypeWrapper<{}>;
  Report: ResolverTypeWrapper<Report>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Attributes: Attributes;
  String: Scalars['String'];
  BaseReport: BaseReport;
  Competency: Competency;
  Boolean: Scalars['Boolean'];
  KeyAreas: KeyAreas;
  Level: Level;
  Int: Scalars['Int'];
  Matrix: Matrix;
  Query: {};
  Report: Report;
  User: User;
};

export type AttributesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attributes'] = ResolversParentTypes['Attributes']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  competency?: Resolver<Maybe<Array<Maybe<ResolversTypes['Competency']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseReport'] = ResolversParentTypes['BaseReport']> = {
  key_areas?: Resolver<Maybe<Array<Maybe<ResolversTypes['KeyAreas']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompetencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Competency'] = ResolversParentTypes['Competency']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  core?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KeyAreasResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeyAreas'] = ResolversParentTypes['KeyAreas']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attributes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Attributes']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LevelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Level'] = ResolversParentTypes['Level']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MatrixResolvers<ContextType = any, ParentType extends ResolversParentTypes['Matrix'] = ResolversParentTypes['Matrix']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getMatrices?: Resolver<Maybe<Array<Maybe<ResolversTypes['Matrix']>>>, ParentType, ContextType>;
  getLevels?: Resolver<Maybe<Array<Maybe<ResolversTypes['Level']>>>, ParentType, ContextType, RequireFields<QueryGetLevelsArgs, never>>;
  getUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryGetUsersArgs, never>>;
  getReportsForUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['Report']>>>, ParentType, ContextType, RequireFields<QueryGetReportsForUserArgs, never>>;
  getBaseReportForUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['BaseReport']>>>, ParentType, ContextType, RequireFields<QueryGetBaseReportForUserArgs, never>>;
};

export type ReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['Report'] = ResolversParentTypes['Report']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  matrix_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manager_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Attributes?: AttributesResolvers<ContextType>;
  BaseReport?: BaseReportResolvers<ContextType>;
  Competency?: CompetencyResolvers<ContextType>;
  KeyAreas?: KeyAreasResolvers<ContextType>;
  Level?: LevelResolvers<ContextType>;
  Matrix?: MatrixResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Report?: ReportResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
