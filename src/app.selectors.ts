import { createSelector } from '@ngrx/store';
import { AppState } from './app/app.reducers';

export const selectLoading = createSelector(
  (state: AppState) => state.auth.loading,
  (state: AppState) => state.user.loading,
  (state: AppState) => state.categories.loading,
  (state: AppState) => state.posts.loading,
  (authLoading, userLoading, categoriesLoading, postsLoading) => {
    return authLoading || userLoading || categoriesLoading || postsLoading;
  }
);
