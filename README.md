Clone the repo and run `npm install` and `npm run dev`

# To-do

- [ ] Login (Allow volunteers and administrators to register if not registered yet)
- [ ] User Registration (Initially only username (use email) and password)
- [ ] User Profile Management (After registration, users should log in first to complete their profile). Following fields will be on the profile page/form:
  - Full Name (50 characters, required)
  - Address 1 (100 characters, required)
  - Address 2 (100 characters, optional)
  - City (100 characters, required)
  - State (Drop Down, selection required) DB will store 2-character state code
  - Zip code (9 characters, at least 5-character code required)
  - Skills (multi-select dropdown, required)
  - Preferences (Text area, optional)
  - Availability (Date picker, multiple dates allowed, required)
- [ ] Event Management Form (Administrators can create and manage events). The form should include:
  - Event Name (100 characters, required)
  - Event Description (Text area, required)
  - Location (Text area, required)
  - Required Skills (Multi-select dropdown, required)
  - Urgency (Drop down, selection required)
  - Event Date (Calendar, date picker)
- [ ] Volunteer Matching Form (A form where administrators can view and match volunteers to events based on their profiles and event requirements):
  - Volunteer Name (Auto-fill from database)
  - Matched Event (Auto-fill from database based on volunteer's profile)
- [ ] Notification System
  - Display notifications for new event assignments, updates, and reminders
- [ ] Volunteer History
  - Tabular display of all volunteer participation history. All fields from Event Management are displayed, along with volunteer’s participation status.
- [ ] Validations in place for required fields, field types, and field lengths.
