-- CreateTable
CREATE TABLE "SolarData" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "roofArea" DOUBLE PRECISION NOT NULL,
    "slope" DOUBLE PRECISION NOT NULL,
    "panelEfficiency" DOUBLE PRECISION NOT NULL,
    "systemLosses" DOUBLE PRECISION NOT NULL,
    "estimatedSystemCost" DOUBLE PRECISION NOT NULL,
    "electricityCost" DOUBLE PRECISION NOT NULL,
    "irradiance" DOUBLE PRECISION,
    "estimatedACEnergy" DOUBLE PRECISION,
    "systemEfficiency" DOUBLE PRECISION,
    "roi" DOUBLE PRECISION,
    "paybackPeriod" DOUBLE PRECISION,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SolarData_pkey" PRIMARY KEY ("id")
);
