CREATE TABLE config (
	configId INT IDENTITY(1,1) PRIMARY KEY,
	parameterName VARCHAR(50) DEFAULT '',
	parameterDescription VARCHAR(255) DEFAULT '',
	valueStr VARCHAR(255),
	valueInt INT,
	valueDate DATETIME
);