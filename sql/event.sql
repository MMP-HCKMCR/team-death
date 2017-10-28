CREATE TABLE event (
	eventId INT IDENTITY(1,1) PRIMARY KEY,
	eventDate DATETIME,
	eventTypeId INT NOT NULL FOREIGN KEY REFERENCES eventType(eventTypeId),
	recipientId INT NOT NULL FOREIGN KEY REFERENCES recipient(recipientId),
	deceasedId INT NOT NULL FOREIGN KEY REFERENCES deceased(deceasedId),
	annualRepeat BIT DEFAULT 0,
	messageId INT NOT NULL FOREIGN KEY REFERENCES message(messageId),
	SMS BIT DEFAULT 0,
	email BIT DEFAULT 0,
	twitter BIT DEFAULT 0,
	messageSent BIT DEFAULT 0
);