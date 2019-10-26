CQL="CREATE KEYSPACE IF NOT EXISTS airbnb
WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':1};

USE airbnb;

CREATE TYPE IF NOT EXISTS reservations(
    reservation_id INT,
    start DATE,
    end DATE,
    adults INT,
    children INT,
    infants INT
);

CREATE TABLE IF NOT EXISTS airbnb.stays(
    stay_id INT,
    price INT,
    guests INT,
    visits INT,
    reservations SET<frozen<reservations>>,
    PRIMARY KEY (stay_id)
);"

until echo $CQL | cqlsh; do
  echo "cqlsh: Cassandra is unavailable to initialize - will retry later"
  sleep 2
done