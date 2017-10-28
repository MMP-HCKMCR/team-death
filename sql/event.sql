CREATE TABLE event (
	eventId INT IDENTITY(1,1) PRIMARY KEY,
	eventDate DATETIME,
	eventTypeId INT,
	recipientId INT,
	deceasedId INT,
	annualRepeat BIT DEFAULT 0,
	messageId INT,
	SMS BIT DEFAULT 0,
	email BIT DEFAULT 0,
	twitter BIT DEFAULT 0,
	FK_eventTypeId INT FOREIGN KEY REFERENCES eventType(eventTypeId),
	FK_recipientId INT FOREIGN KEY REFERENCES recipient(recipientId),
	FK_deceasedId INT FOREIGN KEY REFERENCES deceased(deceasedId),
	FK_messageId INT FOREIGN KEY REFERENCES message(messageId)
);