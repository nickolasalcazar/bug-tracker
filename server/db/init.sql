CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  nickname TEXT,
  picture TEXT
);

-- User groups are named collections of users.
-- E.g. 'Household', 'Computer Science Club'.
CREATE TABLE user_groups (
  group_id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT
);

CREATE TABLE user_group_members (
  group_id SERIAL REFERENCES user_groups(group_id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(user_id),
  is_owner BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (group_id, user_id)
);

CREATE TABLE projects (
  project_id SERIAL PRIMARY KEY,
  user_group_id SERIAL REFERENCES user_groups(group_id),
  title TEXT NOT NULL,
  description TEXT DEFAULT 'No description',
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE project_members (
  project_id SERIAL REFERENCES projects(project_id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(user_id),
  is_owner BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (project_id, user_id)
);

CREATE TABLE project_comments (
  comment_id SERIAL PRIMARY KEY,
  project_id SERIAL REFERENCES projects(project_id) ON DELETE CASCADE,
  author_id TEXT REFERENCES users(user_id),
  comment_text TEXT NOT NULL,
  date_posted TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE task_statuses (
  status_value VARCHAR(50) NOT NULL PRIMARY KEY
);

INSERT INTO task_statuses(status_value)
  VALUES
    ('in progress'), ('not started'), ('completed'),
    ('in review'), ('canceled'), ('archived');

CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  parent_task_id SERIAL REFERENCES tasks(task_id) ON DELETE CASCADE,
  project_id SERIAL REFERENCES projects(project_id) ON DELETE CASCADE,
  owner_id TEXT REFERENCES users(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  "description" TEXT DEFAULT 'No description',
  date_created TIMESTAMP NOT NULL DEFAULT NOW(),
  date_start TIMESTAMP DEFAULT NULL,
  date_end TIMESTAMP DEFAULT NULL,
  "status" VARCHAR(50) REFERENCES task_statuses(status_value) DEFAULT NULL
);

-- Alter table tasks to make foreign keys nullable
ALTER TABLE tasks
  ALTER COLUMN parent_task_id DROP NOT NULL;
ALTER TABLE tasks
  ALTER COLUMN project_id DROP NOT NULL;

CREATE TABLE task_tags (
  task_id SERIAL REFERENCES tasks(task_id) NOT NULL,
  tag_id SERIAL PRIMARY KEY,
  tag_str VARCHAR(16) NOT NULL
);

CREATE TABLE task_subscribers (
  task_id SERIAL REFERENCES tasks(task_id),
  user_id TEXT REFERENCES users(user_id)
);

CREATE TABLE task_comments (
  comment_id SERIAL PRIMARY KEY,
  task_id SERIAL REFERENCES tasks(task_id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(user_id),
  comment_text TEXT NOT NULL,
  date_posted TIMESTAMP NOT NULL DEFAULT NOW()
);
