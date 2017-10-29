CREATE TABLE recipient (
	recipientId INT IDENTITY(1,1) PRIMARY KEY,
	firstName VARCHAR(50) DEFAULT '',
	lastName VARCHAR(50) DEFAULT '',
	recipientNickName VARCHAR(50) DEFAULT '',
	senderNickName VARCHAR(50) DEFAULT '',
	creationDate DATETIME DEFAULT GETDATE(),
	lastUpdated DATETIME DEFAULT GETDATE(),
	phone VARCHAR(50),
	email VARCHAR(50),
	twitter VARCHAR(50),
	deceasedId INT NOT NULL FOREIGN KEY REFERENCES deceased(deceasedId),
	DateOfBirth DATE,
	MeetupEnabled BIT,
	Sex VARCHAR(1)
);