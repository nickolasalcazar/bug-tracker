module.exports = {
  getPendingConnections: `
    SELECT                                        
      sender AS sender_id,
      sender.username AS sender_username,
      sender.nickname AS sender_nickname,
      date_requested
    FROM user_connections c
    JOIN users u ON u.user_id = receiver
    JOIN users sender ON sender.user_id = sender
    WHERE receiver = $1 AND u.user_id = $1 AND pending = TRUE;
  `,
};
