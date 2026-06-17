import { NextResponse } from "next/server";
import { fetchCmcQuotes } from "@/lib/cmc/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbols = (searchParams.get("symbols") ?? "BNB,CAKE,BTC,ETH")
    .split(",")
    .map((symbol) => symbol.trim().toUpperCase())
    .filter(Boolean);

  try {
    const data = await fetchCmcQuotes(symbols);
    return NextResponse.json({ data, fallbackActive: false });
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        fallbackActive: true,
        error: error instanceof Error ? error.message : "CMC quotes unavailable"
      },
      { status: 200 }
    );
  }
}
