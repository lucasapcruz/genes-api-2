CREATE TABLE genes (
	id SERIAL PRIMARY KEY,
	hgnc_symbol VARCHAR(50) NOT NULL,
	hgnc_name VARCHAR(100),
	description TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE aliases (
	id SERIAL PRIMARY KEY,
	gene_id INTEGER NOT NULL,
	alias VARCHAR(50) NOT NULL,
	alias_origin VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE diseases (
	id SERIAL PRIMARY KEY,
	gene_id INTEGER NOT NULL,
	disease VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE body_parts (
	id SERIAL PRIMARY KEY,
	part VARCHAR(150) NOT NULL,
	type VARCHAR(150),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE body_parts_affected_by_diseases (
	id SERIAL PRIMARY KEY,
	body_part_id INTEGER NOT NULL,
	disease_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE aliases ADD CONSTRAINT aliases_fk0 FOREIGN KEY (gene_id) REFERENCES genes(id);
ALTER TABLE diseases ADD CONSTRAINT diseases_fk0 FOREIGN KEY (gene_id) REFERENCES genes(id);
ALTER TABLE body_parts_affected_by_diseases ADD CONSTRAINT bp_fk0 FOREIGN KEY (body_part_id) REFERENCES body_parts(id);
ALTER TABLE body_parts_affected_by_diseases ADD CONSTRAINT bp_fk1 FOREIGN KEY (disease_id) REFERENCES diseases(id);