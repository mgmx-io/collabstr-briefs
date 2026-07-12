import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from "@/navigation";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
