export type Profile = {
  id: string;
  photo: string;
  name: string;
  mobile: string;
  gender: string;
  birthday: string;
  intro:string
};


export type ProfileAction = {
  type: "profile/profile";
  payload: Profile;
};


type InitType = {
  profile: Profile
}

export const initValue: InitType = {
  profile: {},
} as InitType

export default function reducer(state = initValue, action: ProfileAction) {
  switch (action.type) {
    case "profile/profile":
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
}
