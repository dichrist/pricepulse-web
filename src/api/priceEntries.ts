import { http } from "../lib/http";

export type CreatePriceEntryRequest = {  
  item_id: number;
  price: number;
  currency?: string;
  source?: "physical" | "online";
  notes?: string;
};

export async function createPriceEntry(data: CreatePriceEntryRequest) {
  const res = await http.post("/api/v1/price-entries", data);
  return res.data;
}

export async function listPriceEntries() {
  const res = await http.get("/api/v1/price-entries");
  return res.data;
}
