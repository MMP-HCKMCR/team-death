CREATE TABLE deceased (
    deceasedId INT IDENTITY(1,1) PRIMARY KEY,
	firstName VARCHAR(50) DEFAULT '',
	LastName VARCHAR(50) DEFAULT '',
	CreationDate DATETIME DEFAULT GETDATE(),
	LastUpdated DATETIME DEFAULT GETDATE(),
	deceased BIT DEFAULT 0,
	dateOfDeath DATETIME,
	notDeadYet DATETIME,
	notDeadFrequencyId INT,
    FK_notDeadFrequencyId INT FOREIGN KEY REFERENCES notDeadFrequency(notDeadFrequencyId)
);