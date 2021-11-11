CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(80) NOT NULL,
        status BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
    );
    CREATE TABLE subtasks(
        id SERIAL PRIMARY KEY,
        title VARCHAR(80) NOT NULL,
        status BOOLEAN DEFAULT false,
        task_id INT NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks(id)
       );