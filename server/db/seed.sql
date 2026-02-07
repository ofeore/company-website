DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  email TEXT NOT NULL UNIQUE
);

INSERT INTO contacts (email) VALUES
('johnappleseed@gmail.com'),
('test@example.com');