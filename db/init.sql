CREATE TABLE IF NOT EXISTS ideas (
    id SERIAL PRIMARY KEY,
    text VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ideas (text) VALUES ('Ship a tiny app, then add CI');
