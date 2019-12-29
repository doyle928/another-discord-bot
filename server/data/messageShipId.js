let messageShipId = (module.exports = {
  messageIds: [],
  addMessageId: async (messageId, memberOneId, memberTwoId) => {
    let obj = {
      message_id: messageId,
      member_one_id: memberOneId,
      member_two_id: memberTwoId,
      confirmed_ship: false
    };
    messageShipId.messageIds.push(obj);
    console.log(messageShipId.messageIds);
  },
  deleteMessageIds: async memberId => {
    for (let i = 0; i < messageShipId.messageIds.length; i++) {
      if (
        messageShipId.messageIds[i].member_one_id === memberId ||
        messageShipId.messageIds[i].member_two_id === memberId
      ) {
        messageShipId.messageIds.splice(i, 1);
      }
    }
    console.log(messageShipId.messageIds);
  }
});
