-- tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  priority text NOT NULL DEFAULT 'medium',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON tasks
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access"
  ON tasks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON tasks
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON tasks
  FOR DELETE
  USING (true);