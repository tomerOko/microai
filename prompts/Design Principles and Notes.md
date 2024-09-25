# Consultation Platform: additional details:

## A. Business Logicl

### 1. Core Business Concept
The platform facilitates online consultations between users (students) and experts (consultants) across various topics. It provides a flexible, on-demand system for booking and conducting video consultations, with features for scheduling, real-time communication, payments, and quality assurance.

### 2. Key User Roles
- Students: Seek expert advice on specific topics
- Consultants: Provide expertise and consultations

### 3. Consultant Management
- No current approval process for becoming a consultant (provision for future implementation)
- Consultants set their expertise, rates, and availability

### 4. Availability and booking logic 
- Consultants set 'default weekly availability blocks'
- Option to override defaults with 'this week availability blocks'
- 'Available now' flag for immediate availability
- Queue system within availability blocks (each block is an hour)
- Consultants define maximum calls per block
- Students choose availability block, not specific time
- Consultants handle multiple calls within a block

### 6. Billing Model
- Billing based on actual minutes talked, not pre-defined time slots
- Monthly aggregation of charges and payouts to reduce transaction costs

### 7. Review System
- Dual rating system:
  a. Immediate post-consultation rating
  b. Long-term effectiveness rating (e.g., 1 month after consultation)
- Ratings affect consultant visibility in search results
- Consultants can respond to reviews

### 8. Dispute Resolution
- Users can initiate disputes for unsatisfactory consultations
- Admin team reviews disputes and makes decisions
- Refund process in place for valid disputes

### 9. Consultant Earnings
- Earnings tracked based on completed consultations
- Payout system for transferring earnings to consultants
- Transparent fee structure for platform usage

### 10. Mobile Support
- Platform designed with mobile users in mind
- Future development of dedicated mobile apps planned

## B. Technical Design

### 1. System Architecture
- Microservices Architecture: Built on loosely coupled, independently deployable services
- Event-Driven Communication: Services communicate primarily through events published to RabbitMQ
- API Gateway: Handles incoming requests from clients and routes them to appropriate services
- No direct communication between services; all interactions occur through RabbitMQ

### 3. Data Management
- Each service maintains its own data store
- Services listen to relevant events from other services to maintain necessary data
- No direct database access between services
- Each service is responsible for maintaining its own historical data

### 4. Inter-Service Communication
- Strict adherence to event-driven architecture
- Services publish events to RabbitMQ and subscribe to relevant events
- Ensures loose coupling and independent scalability of services

### 5. API Gateway Specifics
- Direct connections only to services requiring synchronous communication
- No connection between API Gateway and RabbitMQ

### 6. File Sharing
- Use of S3 for secure file storage in chats

### 7. User Authentication
- OAuth integration for signup (Google/Apple/Facebook)
- Email pincode verification as an alternative to OAuth

### 8. Payment Processing
- Integration with payment gateways for processing transactions
- Generation of receipts and upload to S3
- Use of signed URLs for secure receipt access

### 9. Notifications
- Multi-channel approach: email, SMS, WhatsApp, push notifications

### 10. Analytics
- Comprehensive system for tracking user behavior and platform performance
- Focus on providing insights to improve platform operations and user experience
- Future plans for providing analytics tools to consultants

### 11. Security Measures
- Authentication and authorization handled by dedicated Auth Service
- Implementation of rate limiting and DDoS protection
- Management of SSL/TLS certificates
- Secure communication protocols for all data transfers

### 12. Compliance
- Adherence to data protection regulations (e.g., GDPR, CCPA)
- Implementation of data retention and deletion policies

### 13. Content Moderation
- Automated content filtering for messages and shared files
- Manual review process for flagged content

### 14. Scalability
- Independent scaling of services based on load
- Asynchronous processing for non-real-time operations
- Caching strategies for frequently accessed data

### 15. Video Call Integration
- Integration with third-party video call provider
- Collection of call metrics: duration, quality, participant details
- Handling of call recording (if implemented in the future)

### 16. Waiting Room Feature
- Implementation of a virtual waiting room for call participants
- Allows users to check in before the scheduled call time

### 17. Monitoring and Logging Infrastructure
- Use of Prometheus for metrics collection and monitoring
- Implementation of Grafana for data visualization and dashboards
- Utilization of Loki for log aggregation and analysis

This revised summary provides a comprehensive overview of both the business logic and technical design of the consultation platform, incorporating the additional details and focusing on key aspects as requested.
