CREATE TABLE [log] (
	logId INT IDENTITY(1,1) PRIMARY KEY,
	logDate DATETIME DEFAULT GETDATE(),
	logEntry VARCHAR(255)
)
	