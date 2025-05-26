export const selectActiveModals = state => state.modal.activeModals;
export const selectIsModalOpen = modalId => state => state.modal.activeModals.includes(modalId);
