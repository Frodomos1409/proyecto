Use registro;
CREATE TABLE IF NOT EXISTS vacunas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT NOT NULL,
  vacuna VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL
);
show tables;
SELECT * FROM vacunas;

