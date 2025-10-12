"use client";

import { Toaster } from "react-hot-toast";
import TanstackQueryProvider from "./providers/query-providers";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider>
      <Toaster />
      {children}
    </TanstackQueryProvider>
  );
}
