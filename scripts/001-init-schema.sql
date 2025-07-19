-- Create the events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL
);

-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  tickets_count INTEGER NOT NULL,
  ticket_id TEXT UNIQUE NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some initial event data if the table is empty
INSERT INTO events (name, date, time, location, image_url, description, price)
VALUES
  ('Annual Tech Conference 2025', 'October 26, 2025', '9:00 AM - 5:00 PM', 'Grand Convention Center, Hall A', '/placeholder.svg?height=400&width=600', 'Join us for the biggest tech conference of the year, featuring leading experts and innovators.', 199.99),
  ('Future of AI Summit', 'November 15, 2025', '10:00 AM - 4:00 PM', 'Innovation Hub Auditorium', '/placeholder.svg?height=400&width=600', 'Explore the latest advancements and ethical considerations in Artificial Intelligence.', 249.99),
  ('Web Development Workshop', 'December 5, 2025', '1:00 PM - 6:00 PM', 'Community Learning Center, Room 101', '/placeholder.svg?height=400&width=600', 'A hands-on workshop covering modern web development frameworks and best practices.', 99.99),
  ('Digital Marketing Masterclass', 'January 20, 2026', '9:30 AM - 1:30 PM', 'Business Incubation Center', '/placeholder.svg?height=400&width=600', 'Learn strategies to boost your online presence and drive engagement.', 149.99)
ON CONFLICT (id) DO NOTHING;
