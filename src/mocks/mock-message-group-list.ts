import { TMessageGroupByDateTmpProps } from '../pages/chats/parts/message-group-by-date/message-group-by-date.types';

export const MOCK_MESSAGE_GROUP_LIST: { [id: string]: TMessageGroupByDateTmpProps[] } = {
  'id-chat-1': [
    {
      date: '20 мая',
      messages: [
        {
          // eslint-disable-next-line max-len
          text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
          time: '12:40',
        },
        {
          text: 'Ok',
          time: '12:55',
          fromMe: true,
          isRead: true,
        },
        {
          text: 'Some message',
          time: '12:55',
        },
        {
          text: 'One more message',
          time: '12:55',
          fromMe: true,
          isRead: false,
        },
      ],
    },
    {
      date: 'Сегодня',
      messages: [
        {
          text: 'One more message',
          time: '12:55',
          fromMe: true,
          isRead: false,
        },
        {
          text: 'And one more message',
          time: '12:55',
          fromMe: true,
          isRead: false,
        },
      ],
    },
  ],
  'id-chat-2': [
    {
      date: 'Сегодня',
      messages: [
        {
          text: 'One more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
        {
          text: 'And one more message',
          time: '12:55',
        },
      ],
    },
  ],
  'id-chat-3': [
    {
      date: 'Сегодня',
      messages: [
        {
          text: 'One more message',
          time: '12:55',
          fromMe: true,
          isRead: true,
        },
        {
          text: 'And one more message',
          time: '12:55',
          fromMe: true,
          isRead: false,
        },
      ],
    },
  ],
};
