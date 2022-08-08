export type TChatsHeaderTmpProps = {
  searchInputComponent: string;
  menuButton: string;
  menuBtnModifiers: string;
  isSettingsOpen: boolean;
  profileBtnId: string;
  logoutBtnId: string;
  addContactBtnId: string;
};

export type TChatsHeaderComponentState = {
  isSettingsOpen: boolean;
};

export type TChatsHeaderComponentCallbacks = {
  onAddChat: () => void;
};
