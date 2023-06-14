module.exports = {
  getPendingConnections: `
    SELECT                                        
      sender AS sender_id,
      sender.username AS sender_username,
      sender.nickname AS sender_nickname,
      date_requested,
      pending,
      connected
    FROM user_connections c
    JOIN users u ON u.user_id = receiver
    JOIN users sender ON sender.user_id = sender
    WHERE receiver = 'oauth2|GCP-MugBug|111232945032492215545' AND u.user_id='oauth2|GCP-MugBug|111232945032492215545' AND pending = TRUE;
  `,
};
