CREATE TABLE deceased (
    deceasedId INT IDENTITY(1,1) PRIMARY KEY,
	firstName VARCHAR(50) DEFAULT '',
	LastName VARCHAR(50) DEFAULT '',
	CreationDate DATETIME DEFAULT GETDATE(),
	LastUpdated DATETIME DEFAULT GETDATE(),
	deceased BIT DEFAULT 0,
	dateOfDeath DATETIME,
	notDeadYet DATETIME,
	notDeadFrequencyId INT NOT NULL FOREIGN KEY REFERENCES notDeadFrequency(notDeadFrequencyId),
	email VARCHAR(255) DEFAULT '',
	phone VARCHAR(50) DEFAULT '',
	LastLoginDate DATETIME
);