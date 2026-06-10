-- Create Wrestlers table
CREATE TABLE IF NOT EXISTS Wrestlers (
    WrestlerID SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Finisher VARCHAR(100),
    Wins INT DEFAULT 0,
    Losses INT DEFAULT 0,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Matches table (connects wrestlers)
CREATE TABLE IF NOT EXISTS Matches (
    MatchID SERIAL PRIMARY KEY,
    Wrestler1ID INT NOT NULL,
    Wrestler2ID INT NOT NULL,
    Winner INT,
    MatchDate DATE,
    FOREIGN KEY (Wrestler1ID) REFERENCES Wrestlers(WrestlerID),
    FOREIGN KEY (Wrestler2ID) REFERENCES Wrestlers(WrestlerID),
    FOREIGN KEY (Winner) REFERENCES Wrestlers(WrestlerID)
);

-- insert some sample wrestlers

INSERT INTO Wrestlers (Name, Finisher) VALUES 
('John Cena', 'Attitude Adjustment'),
('The Rock', 'Rock Bottom'),
('Stone Cold Steve Austin', 'Stone Cold Stunner'),
('Hulk Hogan', 'Leg Drop');

-- view all wrestlers
SELECT * FROM Wrestlers;

-- update a wrestler's finisher
UPDATE Wrestlers
SET Finisher = 'F5'
WHERE Name = 'John Cena';

-- enter a match result 

INSERT INTO Matches (Wrestler1ID, Wrestler2ID, Winner, MatchDate) VALUES 
(1, 2, 1, '2024-01-15');

UPDATE Wrestlers
SET Wins = Wins + 1
WHERE WrestlerID = 1;

UPDATE Wrestlers
SET Losses = Losses + 1
WHERE WrestlerID = 2;

-- transaction:

START TRANSACTION;

INSERT INTO Matches (Wrestler1ID, Wrestler2ID, Winner, MatchDate)
VALUES (1, 2, 1, CURRENT_DATE);

UPDATE Wrestlers
SET Wins = Wins + 1
WHERE WrestlerID = 1;

UPDATE Wrestlers
SET Losses = Losses + 1
WHERE WrestlerID = 2;

COMMIT;

-- join data

SELECT 
    m.MatchID, 
    w1.Name AS Wrestler1, 
    w2.Name AS Wrestler2, 
    w3.Name AS Winner, 
    m.MatchDate
FROM Matches m
JOIN Wrestlers w1 ON m.Wrestler1ID = w1.WrestlerID
JOIN Wrestlers w2 ON m.Wrestler2ID = w2.WrestlerID
JOIN Wrestlers w3 ON m.Winner = w3.WrestlerID;




