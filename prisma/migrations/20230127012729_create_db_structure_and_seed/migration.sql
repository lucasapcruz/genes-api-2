-- CreateTable
CREATE TABLE "aliases" (
    "id" SERIAL NOT NULL,
    "gene_id" INTEGER NOT NULL,
    "alias" VARCHAR(50) NOT NULL,
    "alias_origin" VARCHAR(50),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aliases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_parts" (
    "id" SERIAL NOT NULL,
    "part" VARCHAR(150) NOT NULL,
    "type" VARCHAR(150),
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "body_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_parts_affected_by_diseases" (
    "id" SERIAL NOT NULL,
    "body_part_id" INTEGER NOT NULL,
    "disease_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "body_parts_affected_by_diseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diseases" (
    "id" SERIAL NOT NULL,
    "gene_id" INTEGER NOT NULL,
    "disease" VARCHAR(150) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diseases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genes" (
    "id" SERIAL NOT NULL,
    "hgnc_symbol" VARCHAR(50) NOT NULL,
    "hgnc_name" VARCHAR(100),
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "genes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aliases" ADD CONSTRAINT "aliases_fk0" FOREIGN KEY ("gene_id") REFERENCES "genes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "body_parts_affected_by_diseases" ADD CONSTRAINT "bp_fk0" FOREIGN KEY ("body_part_id") REFERENCES "body_parts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "body_parts_affected_by_diseases" ADD CONSTRAINT "bp_fk1" FOREIGN KEY ("disease_id") REFERENCES "diseases"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "diseases" ADD CONSTRAINT "diseases_fk0" FOREIGN KEY ("gene_id") REFERENCES "genes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
