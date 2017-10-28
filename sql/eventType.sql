CREATE TABLE eventType (
	eventTypeId INT IDENTITY(1,1) PRIMARY KEY,
	eventName VARCHAR(50),
	eventDate DATETIME,
	ignoreYear BIT DEFAULT 1
);

