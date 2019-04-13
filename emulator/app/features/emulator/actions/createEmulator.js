export const NEW_EMULATOR = 'NEW_EMULATOR';

export const createEmulator = initialFrame => ({
  type: NEW_EMULATOR,
  payload: initialFrame,
});
