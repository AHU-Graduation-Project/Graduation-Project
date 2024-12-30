-- Schema Creation
CREATE SCHEMA IF NOT EXISTS devPath;

-- Country Table
CREATE TABLE IF NOT EXISTS devPath.country (
  country_id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

-- User Table
CREATE TABLE IF NOT EXISTS devPath."User" (
  user_id SERIAL PRIMARY KEY,
  fname VARCHAR(50) NOT NULL,
  lname VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(300) NOT NULL,
  country_id INT,
  FOREIGN KEY (country_id) REFERENCES devPath.country (country_id) ON DELETE SET NULL
);

-- Roadmap Table
CREATE TABLE IF NOT EXISTS devPath."Roadmap" (
  roadmap_id SERIAL PRIMARY KEY,
  title VARCHAR(50) UNIQUE NOT NULL,
  keywords VARCHAR(50) UNIQUE NOT NULL
);

-- Node Type Table
CREATE TABLE IF NOT EXISTS devPath.node_type (
  node_type_id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

-- Topic Table
CREATE TABLE IF NOT EXISTS devPath."Topic" (
  topic_id SERIAL PRIMARY KEY,
  title VARCHAR(20) UNIQUE NOT NULL,
  description TEXT,
  node_type_id INT NOT NULL,
  keywords VARCHAR(50),
  position_x INT NOT NULL,
  position_y INT NOT NULL,
  is_analysis_needed BOOLEAN NOT NULL,
  roadmap_id INT NOT NULL,
  parent_topic_id INT,
  resources TEXT, -- New Attribute for Resources
  FOREIGN KEY (roadmap_id) REFERENCES devPath."Roadmap" (roadmap_id) ON DELETE CASCADE,
  FOREIGN KEY (node_type_id) REFERENCES devPath.node_type (node_type_id) ON DELETE SET NULL,
  FOREIGN KEY (parent_topic_id) REFERENCES devPath."Topic" (topic_id) ON DELETE SET NULL
);

-- Edge Type Table
CREATE TABLE IF NOT EXISTS devPath.edge_type (
  edge_type_id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

-- Edge Table
CREATE TABLE IF NOT EXISTS devPath.edge (
  edge_id SERIAL PRIMARY KEY,
  source_topic_id INT NOT NULL,
  target_topic_id INT NOT NULL,
  edge_type_id INT NOT NULL,
  FOREIGN KEY (source_topic_id) REFERENCES devPath."Topic" (topic_id) ON DELETE CASCADE,
  FOREIGN KEY (target_topic_id) REFERENCES devPath."Topic" (topic_id) ON DELETE CASCADE,
  FOREIGN KEY (edge_type_id) REFERENCES devPath.edge_type (edge_type_id) ON DELETE SET NULL
);

-- Follow Table
CREATE TABLE IF NOT EXISTS devPath."Follow" (
  user_id INT NOT NULL,
  roadmap_id INT NOT NULL,
  PRIMARY KEY (user_id, roadmap_id),
  FOREIGN KEY (user_id) REFERENCES devPath."User" (user_id) ON DELETE CASCADE,
  FOREIGN KEY (roadmap_id) REFERENCES devPath."Roadmap" (roadmap_id) ON DELETE CASCADE
);

-- Achieved Table
CREATE TABLE IF NOT EXISTS devPath."Achieved" (
  user_id INT NOT NULL,
  topic_id INT NOT NULL,
  roadmap_id INT NOT NULL,
  PRIMARY KEY (user_id, topic_id, roadmap_id),
  FOREIGN KEY (user_id) REFERENCES devPath."User" (user_id) ON DELETE CASCADE,
  FOREIGN KEY (topic_id) REFERENCES devPath."Topic" (topic_id) ON DELETE CASCADE,
  FOREIGN KEY (roadmap_id) REFERENCES devPath."Roadmap" (roadmap_id) ON DELETE CASCADE
);
