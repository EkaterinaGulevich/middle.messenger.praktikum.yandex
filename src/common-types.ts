export type TJsonValue = string | number | boolean | null | undefined | TJsonValue[] | { [key: string]: TJsonValue };

export type TJsonObject = { [key: string]: TJsonValue };

export type TResChat = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string | null;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  } | null;
};
