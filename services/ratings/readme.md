11. Business Logic Explanation
Collecting Ratings and Reviews
After Call Ends:

When a call ends, the service prepares for accepting a review from the student.
This can involve sending a notification or marking the booking as eligible for review.
Adding a Review:

Students can rate and review consultants they have had a call with.
The service saves the review and recalculates the consultant's average rating.
A REVIEW_ADDED event is published after a review is successfully added.
Displaying Ratings and Reviews
Fetching Consultant Reviews:
Provides an API to get all reviews for a specific consultant.
Returns the average rating and a list of reviews.
Calculating Aggregate Ratings
Recalculating Average Rating:
After each new review, the service recalculates the consultant's average rating.
The average rating is updated in the consultant's rating record.
Handling Notifications
Publishing Events:
The service publishes events when a review is added.
Other services, like the Notifications Service, can listen to these events to notify consultants.
Security and Data Integrity
Authorization:

Only authenticated students can add reviews.
Students can only review consultants they have had a call with (not fully implemented in the placeholder).
Data Validation:

Inputs are validated using Zod schemas to ensure data integrity.
Scalability and Extensibility
Modular Design:

The code is organized into controllers, services, data access layers, and configurations.
Makes it easy to maintain and extend functionality.
Event-Driven Architecture:

Uses RabbitMQ for asynchronous communication between services.
Supports scalability by decoupling service dependencies.
