import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const solarData = await prisma.solarData.create({
      data: {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        roofArea: parseFloat(data.roofArea),
        slope: parseFloat(data.slope),
        panelEfficiency: parseFloat(data.panelEfficiency),
        systemLosses: parseFloat(data.systemLosses),
        estimatedSystemCost: parseFloat(data.estimatedSystemCost),
        electricityCost: parseFloat(data.electricityCost),
        irradiance: parseFloat(data.irradiance) || null,
        estimatedACEnergy: parseFloat(data.estimatedACEnergy) || null,
        systemEfficiency: parseFloat(data.systemEfficiency) || null,
        roi: parseFloat(data.roi) || null,
        paybackPeriod: parseFloat(data.paybackPeriod) || null,
      },
    });

    return NextResponse.json(
      {
        solarData,
        message: "Solar data saved successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving solar data:", error);
    return NextResponse.json(
      { error: "Failed to save solar data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
