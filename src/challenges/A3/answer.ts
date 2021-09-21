/**
 * In this challenge, you should sort messages by their sentAt property (oldest first) and
 * modify them by adding an "unread" property
 * (boolean meaning that the current user did not read this message) based on the lastActivityDatetime
 * input.
 *
 * @param lastActivityDatetime String representing an ISO8601 datetime. Represent the last time the user checked his messages
 * @param messages List of messages, unsorted and without unread property
 * @returns Sorted list of messages with the unread information
 */

// ↓ uncomment bellow lines and add your response

export default function ({
  lastActivityDatetime,
  messages,
}: {
  lastActivityDatetime: string;
  messages: Message[];
}): MessageWithUnread[] {
  return messages
    .map(({ ...user }) => {
      const dateActivity: Date = new Date(lastActivityDatetime);
      const dateSentAt: Date = new Date(user.sentAt);
      const dateSentAtString = dateSentAt.getTime();
      const dateActivityString = dateActivity.getTime();

      let unreadRaw: boolean;
      if (dateActivityString < dateSentAtString) {
        unreadRaw = true;
      } else if (dateActivityString > dateSentAtString) {
        unreadRaw = false;
      } else {
        unreadRaw = false;
      }

      return { ...user, unread: unreadRaw };
    })
    .sort((a, b) => Date.parse(a.sentAt) - Date.parse(b.sentAt));
}

// used interfaces, do not touch
export interface Message {
  author: string;
  sentAt: string;
  message: string;
}

export interface MessageWithUnread extends Message {
  unread: boolean;
}
