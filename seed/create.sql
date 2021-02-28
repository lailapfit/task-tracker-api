CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES users (id)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description TEXT,
    project_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE TABLE task_logs (
    id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    duration_minutes INT,
    FOREIGN KEY (task_id) REFERENCES tasks (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);