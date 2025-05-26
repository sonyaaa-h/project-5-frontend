export const selectTransactions = (state) => state.transactions.items;
export const selectError = (state) => state.transactions.error;
export const selectPagination = (state) => state.transactions.pageInfo;
export const selectIsLoading = (state) => state.transactions.isLoading;
