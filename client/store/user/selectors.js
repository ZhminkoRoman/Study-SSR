import { createSelector } from '@reduxjs/toolkit';

export const selectUser = ({ user }) => user;

export const selectUsername = createSelector(
  selectUser,
  ({ username }) => username,
);

export const selectUserIsLogged = createSelector(
  selectUser,
  ({ isLoggedIn }) => isLoggedIn,
);

export const selectUserKeepSignedIn = createSelector(
  selectUser,
  ({ keepSignedIn }) => keepSignedIn,
);

export const selectLoginLoading = createSelector(
  selectUser,
  ({ loginLoading }) => loginLoading,
);

export const selectUserId = createSelector(
  selectUser,
  ({ userId }) => userId,
);

export const selectCompanyId = createSelector(
  selectUser,
  ({ companyId }) => companyId,
);

export const selectOffline = createSelector(
  selectUser,
  ({ isOffline }) => isOffline,
);

export const selectLoading = createSelector(
  selectUser,
  ({ loading }) => loading,
);

export const selectUsersData = createSelector(
  selectUser,
  ({ usersData }) => usersData,
);

export const selectCurrentUserData = createSelector(
  selectUser,
  ({ usersData, userId }) => usersData.find((item) => item.userId === userId),
);

export const selectIsFirstLogin = createSelector(
  selectCurrentUserData,
  (currentUserData) => currentUserData?.isFirstLogin,
);

export const selectPopupMessage = createSelector(
  selectUser,
  ({ popupMessage }) => popupMessage,
);
