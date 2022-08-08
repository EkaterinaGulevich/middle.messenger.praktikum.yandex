import { TGroupOfMessage, TMessageResponse } from 'src/types';
import { getRelativeDate } from 'src/utils/get-relative-date';

export const groupMessageByDate = (
  messages: TMessageResponse[],
  existingGroups: TGroupOfMessage[]
): TGroupOfMessage[] => {
  const groups: TGroupOfMessage[] = existingGroups;

  messages.forEach((mes) => {
    const group = groups.find((g) => g.date === getRelativeDate(mes.time));
    if (group) {
      if (group.messages.find(m => m.time === mes.time && m.content === mes.content) === undefined) {
        group.messages.push(mes);
      }
    } else {
      groups.push({
        date: getRelativeDate(mes.time),
        messages: [mes],
      });
    }
  });

  return groups;
};
