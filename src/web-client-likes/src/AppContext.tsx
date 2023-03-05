import { createContext, Dispatch, useContext, useReducer } from "react";
import { useGetTagsQuery } from "./graphql/generated/schema";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  AddUser = "ADD_USER",
  SetupUserInfo = "SETUP_USERINFO",
  SetupTags = "SETUP_TAGS",
  AddTag = "ADD_TAG",
  ToggleTag = "TOGGLE_TAG",
}

export interface AppStateType {
  userInfo: UserInfo;
  tags: TagItem[];
}

export interface UserInfo {
  technologies: string[];
  name: string;
  account: string;
  image: string;
  bio: string;
}

export interface TagItem {
  name: string;
  isChecked: boolean;
}

export type UserInfoPayload = {
  [Types.SetupUserInfo]: {
    userInfo: UserInfo;
  };
  [Types.AddUser]: {
    name: string;
  };
};

export type TagsPayload = {
  [Types.SetupTags]: {
    tags: string[];
    technologies: string[];
  };
  [Types.AddTag]: {
    name: string;
  };
  [Types.ToggleTag]: {
    item: TagItem;
  };
};

const initialUserInfo: UserInfo = {
  name: "FirstName LastName",
  account: "github_account",
  image: "https://bulma.io/images/placeholders/128x128.png",
  bio: "Software Engineer",
  technologies: ["Nothing"],
};

const initialAppState: AppStateType = {
  userInfo: initialUserInfo,
  tags: [],
};

const AppContext = createContext<{
  state: AppStateType;
  dispatch: Dispatch<UserInfoActions | TagsActions>;
}>({
  state: initialAppState,
  dispatch: () => null,
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = (
  props: AppProviderProps
) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}

const appReducer = (
  { userInfo, tags }: AppStateType,
  action: UserInfoActions | TagsActions
) =>
  ({
    userInfo: userInfoReducer(userInfo, action),
    tags: tagsReducer(tags, action),
  } as AppStateType);

export type UserInfoActions =
  ActionMap<UserInfoPayload>[keyof ActionMap<UserInfoPayload>];

const userInfoReducer = (
  state: UserInfo,
  action: UserInfoActions | TagsActions
) => {
  switch (action.type) {
    case Types.SetupUserInfo:
      console.log("userInfoReducer > SetupUserInfo");
      return { ...action.payload.userInfo };
    case Types.AddUser:
      console.log("AddUser");
      return state;
    case Types.ToggleTag:
      console.log("userInfoReducer > ToggleTag");
      const technologies = action.payload.item.isChecked
        ? [...state.technologies, action.payload.item.name]
        : state.technologies.filter((x) => x != action.payload.item.name);
      return { ...state, technologies };
    default:
      return state;
  }
};

export type TagsActions = ActionMap<TagsPayload>[keyof ActionMap<TagsPayload>];

const tagsReducer = (
  state: TagItem[],
  action: UserInfoActions | TagsActions
) => {
  switch (action.type) {
    case Types.SetupUserInfo:
      console.log("tagsReducer > SetupUserInfo");
      return state.map((x) => {
        const isChecked =
          action.payload.userInfo.technologies.indexOf(x.name) > -1;
        return { ...x, isChecked };
      });
    case Types.SetupTags:
      console.log("SetupTags: " + `${JSON.stringify(action.payload)}`);
      return action.payload.tags.map((x) => {
        const isChecked = action.payload.technologies.indexOf(x) > -1;
        return { name: x, isChecked };
      });
    case Types.AddTag:
      console.log("AddTag");
      return [...state, { name: action.payload.name, isChecked: false }];
    case Types.ToggleTag:
      console.log("tagsReducer > ToggleTag");
      return state.map((x) =>
        x.name == action.payload.item.name ? action.payload.item : x
      );
    default:
      return state;
  }
};
