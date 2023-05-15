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
	member_id TEXT REFERENCES users(user_id),
	is_owner BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (group_id, member_id)
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
	member_id TEXT REFERENCES users(user_id),
	is_owner BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY (project_id, member_id)
);

CREATE TABLE project_comments (
	comment_id SERIAL PRIMARY KEY,
	project_id SERIAL REFERENCES projects(project_id) ON DELETE CASCADE,
	author_id TEXT REFERENCES users(user_id),
	comment_text TEXT NOT NULL,
	date_posted TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
	task_id SERIAL PRIMARY KEY,
	parent_task_id SERIAL REFERENCES tasks(task_id) ON DELETE CASCADE,
	project_id SERIAL REFERENCES projects(project_id) ON DELETE CASCADE,
	title TEXT NOT NULL,
	"description" TEXT DEFAULT 'No description',
	date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Alter table tasks to make foreign keys nullable
ALTER TABLE tasks
	ALTER COLUMN parent_task_id DROP NOT NULL;
ALTER TABLE tasks
	ALTER COLUMN project_id DROP NOT NULL;

CREATE TABLE task_subscribers (
	task_id SERIAL REFERENCES tasks(task_id),
	user_id TEXT REFERENCES users(user_id)
);

CREATE TABLE task_comments (
	comment_id SERIAL PRIMARY KEY,
	task_id SERIAL REFERENCES tasks(task_id) ON DELETE CASCADE,
	author_id TEXT REFERENCES users(user_id),
	comment_text TEXT NOT NULL,
	date_posted TIMESTAMP NOT NULL DEFAULT NOW()
);
