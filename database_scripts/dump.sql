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

ALTER TABLE aliases ADD CONSTRAINT aliases_fk0 FOREIGN KEY (gene_id) REFERENCES genes(id);
ALTER TABLE diseases ADD CONSTRAINT diseases_fk0 FOREIGN KEY (gene_id) REFERENCES genes(id);