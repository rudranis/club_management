
# Club Management System Backend

This folder contains the PHP backend for the Club Management System. It provides APIs to interact with the MySQL database for managing clubs, users, events, and more.

## Setup Instructions

1. Install XAMPP (or a similar PHP/MySQL environment)
2. Start Apache and MySQL services
3. Navigate to phpMyAdmin and import the database schema from `schema/database.sql`
4. Place the entire `backend` folder in your XAMPP htdocs directory
5. Configure the frontend to point to these API endpoints

## API Endpoints

### Clubs
- `GET /api/clubs.php` - Get all clubs
- `GET /api/clubs.php?id=1` - Get specific club
- `POST /api/clubs.php` - Create a new club
- `PUT /api/clubs.php` - Update a club
- `DELETE /api/clubs.php` - Delete a club

### Join Requests
- `GET /api/join_requests.php?user_id=1` - Get join requests for a user
- `GET /api/join_requests.php?club_id=1` - Get join requests for a club
- `POST /api/join_requests.php` - Create a new join request
- `PUT /api/join_requests.php` - Update a join request status
- `DELETE /api/join_requests.php` - Cancel a join request

## Database Features

- **Triggers**: Automatically handles member status updates, prevents duplicates
- **Views**: Simplifies data retrieval for complex queries
- **Stored Procedures**: Encapsulates business logic
- **Transactions**: Ensures data integrity for multi-step operations
