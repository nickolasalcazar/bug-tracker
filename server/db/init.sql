CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  nickname TEXT,
  picture TEXT,
  date_joined TIMESTAMP DEFAULT NOW()
);

-- Connections with other users, i.e. 'friends'.
CREATE TABLE user_connections (
  sender TEXT REFERENCES users(user_id), -- Initiates connection
  receiver TEXT REFERENCES users(user_id), -- Accepts connection
  pending BOOLEAN DEFAULT TRUE,
  connected BOOLEAN DEFAULT FALSE,
  date_requested TIMESTAMP DEFAULT NOW(),
  date_accepted TIMESTAMP DEFAULT NULL,
  UNIQUE (sender, receiver),
  UNIQUE (receiver, sender)
);

CREATE TABLE task_statuses (
  status_value VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO task_statuses(status_value)
  VALUES
    ('in progress'), ('not started'), ('completed'),
    ('in review'), ('canceled'), ('archived');

CREATE TABLE task_priorities (
  priority_value VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO task_priorities(priority_value)
  VALUES ('low'), ('medium'), ('high'), ('urgent'), ('critical');

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  parent_task_id SERIAL REFERENCES tasks(task_id) ON DELETE CASCADE,
  owner_id TEXT REFERENCES users(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  "description" TEXT DEFAULT 'No description',
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  date_modified TIMESTAMP NOT NULL DEFAULT NOW(),
  date_start TIMESTAMP DEFAULT NULL,
  date_end TIMESTAMP DEFAULT NULL,
  "status" VARCHAR(50) REFERENCES task_statuses(status_value) DEFAULT NULL,
  "priority" VARCHAR(50) REFERENCES task_priorities(priority_value) DEFAULT NULL,
  tags VARCHAR(16) ARRAY[8],   -- 8 max
  subscribers TEXT ARRAY[256] -- 256 max
);

-- Alter table tasks to make foreign keys nullable
ALTER TABLE tasks
  ALTER COLUMN parent_task_id DROP NOT NULL;

CREATE TABLE task_comments (
  comment_id SERIAL PRIMARY KEY,
  task_id SERIAL REFERENCES tasks(task_id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(user_id),
  comment_text TEXT NOT NULL,
  date_posted TIMESTAMP NOT NULL DEFAULT NOW()
);
