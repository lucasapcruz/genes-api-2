# genes-api

A POC for a gene information service built using TypeScript

## Routes
  `GET /genes`: Returns a paginated list of genes, with 10 genes per page (default). Accepts parameters as qeeries (page, results_per_page)
  
  `GET /genes/:id`: Return a specific gene by ID
  
  `POST /genes`: Creates a new gene

   `{ "hgncSymbol": "BHLHE40", "hgncName": "Basic Helix-Loop-Helix Family Member E40", "description": "BHLHE40 (Basic Helix-Loop-Helix Family Member E40) is a Protein Coding gene." }`

  `POST /genes/:id/aliases`: Creates a alias for specific gene
   
   `{ "alias": "DEC1", "aliasOrigin": "litearute" }`

  `PUT /genes/:id`: Updates an existing gene

  `{"hgncSymbol": "BHLHE40", "hgncName": "Basic Helix-Loop-Helix Family Member E40", "description": "BHLHE40 (Basic Helix-Loop-Helix Family Member E40) is a Protein Coding gene." }`
  
  `DELETE /genes/:id`: Deletes a gene
  
## Installation and Usage

After cloning, install dependencies: ```npm install```

Dump the database on PostgresSQL from `./database_scripts/dump.sql`

Create `.env` file based on `.env.example`

Start the service: ```npm start```

## References

For gene information and reference, visit [HUGO](https://www.genenames.org/)

## License
This project is licensed under the MIT License. See the LICENSE file for details.