"use client";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

export const EventSourceContext = createContext<EventSource | null>(null);

export const EventSourceProvider = ({ children }: { children: ReactNode }) => {
  const [eventSource, setEventSource] = useState<null | EventSource>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      const source = new EventSource(`/api/receipts/${id}/notify`, {
        withCredentials: true,
      });
      setEventSource(source);

      return () => {
        source.close();
      };
    }
  }, [id]);

  return (
    <EventSourceContext.Provider value={eventSource}>
      {children}
    </EventSourceContext.Provider>
  );
};

export const useID = () => {
  const currentIDContext = useContext(EventSourceContext);

  if (!currentIDContext) {
    throw new Error("useID has to be used within <currentIDContext.Provider>");
  }

  return currentIDContext;
};
