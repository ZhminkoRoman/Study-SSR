import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  isLoggedIn: false,
  keepSignedIn: true,
  loginLoading: false,
  userId: null,
  companyId: null,
  isOffline: null,
  loading: true,
  usersData: [],
  popupMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, { payload: value }) {
      state.username = value;
    },
    setLoginStatus(state, { payload: status }) {
      state.isLoggedIn = status;
    },
    setKeepSignedIn(state, { payload: value }) {
      state.keepSignedIn = value;
    },
    setLoginLoading(state, { payload: value }) {
      state.loginLoading = value;
    },
    setUserId(state, { payload }) {
      state.userId = payload;
    },
    setCompanyId(state, { payload }) {
      state.companyId = payload;
    },
    setFirstLogin(state, { payload }) {
      state.isFirstLogin = payload;
    },
    setOffline(state, { payload }) {
      state.isOffline = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    addUsersData(state, { payload: userId }) {
      state.usersData = [
        ...state.usersData,
        {
          userId,
          recognitionLanguages: {},
          isFirstLogin: true,
        },
      ];
    },
    editCurrentUserData(state, { payload }) {
      state.usersData = state.usersData.map((item) => {
        if (state.userId === item.userId) {
          return merge({}, item, payload);
        }
        return item;
      });
    },
    setRecognitionLanguages(state, { payload }) {
      const { recognitionLanguages, expoId } = payload;
      state.usersData = state.usersData.map((item) => {
        if (state.userId === item.userId) {
          const result = { ...item };
          result.recognitionLanguages[expoId] = recognitionLanguages;
          return result;
        }
        return item;
      });
    },
    setPopupMessage(state, { payload }) {
      state.popupMessage = payload;
    },
  },
});

export const {
  setUsername: setUsernameAction,
  setLoginStatus: setLoginStatusAction,
  setKeepSignedIn: setKeepSignedInAction,
  setLoginLoading: setLoginLoadingAction,
  setUserId: setUserIdAction,
  setCompanyId: setCompanyIdAction,
  setFirstLogin: setFirstLoginAction,
  setOffline: setOfflineAction,
  setLoading: setLoadingAction,
  addUsersData: addUsersDataAction,
  editCurrentUserData: editCurrentUserDataAction,
  setRecognitionLanguages: setRecognitionLanguagesAction,
  setPopupMessage: setPopupMessageAction,
} = userSlice.actions;

export default userSlice.reducer;