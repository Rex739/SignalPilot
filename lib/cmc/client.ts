export type CmcQuote = {
  symbol: string;
  quote?: {
    USD?: {
      price?: number;
      volume_24h?: number;
      volume_change_24h?: number;
      percent_change_24h?: number;
      market_cap?: number;
      last_updated?: string;
    };
  };
};

type CmcResponse = {
  data?: Record<string, CmcQuote>;
  status?: {
    error_code?: number;
    error_message?: string;
  };
};

export async function fetchCmcQuotes(symbols: string[]) {
  const apiKey = process.env.CMC_API_KEY;
  if (!apiKey) {
    throw new Error("CMC_API_KEY is not configured");
  }

  const url = new URL("https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest");
  url.searchParams.set("symbol", symbols.join(","));
  url.searchParams.set("convert", "USD");

  const response = await fetch(url, {
    headers: {
      "X-CMC_PRO_API_KEY": apiKey,
      Accept: "application/json"
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`CMC latest quotes failed with ${response.status}`);
  }

  const payload = (await response.json()) as CmcResponse;
  if (payload.status?.error_code) {
    throw new Error(payload.status.error_message ?? "CMC latest quotes returned an error");
  }

  return payload.data ?? {};
}
