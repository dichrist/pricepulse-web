import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPriceEntry, listPriceEntries } from "../api/priceEntries";

export default function PriceEntriesPage() {
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["price-entries"],
    queryFn: listPriceEntries,
  });

  const createMut = useMutation({
    mutationFn: createPriceEntry,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["price-entries"] }),
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar</p>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h2>Price entries</h2>

      <button
        onClick={() =>
          createMut.mutate({
            item_id: 1,
            price: 9.99,
            currency: "BRL",
            source: "physical",
            notes: "teste web",
          })
        }
        disabled={createMut.isPending}
      >
        {createMut.isPending ? "Salvando..." : "Criar entry (teste)"}
      </button>

      <pre style={{ marginTop: 16, background: "#111", padding: 12, borderRadius: 8, overflow: "auto" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
