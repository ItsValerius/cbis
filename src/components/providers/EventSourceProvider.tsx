"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const EventSourceContext = createContext<null | {
  eventSource: EventSource | null;
  setId: Dispatch<SetStateAction<number | null>>;
}>({ eventSource: null, setId: () => {} });

export const EventSourceProvider = ({ children }: { children: ReactNode }) => {
  const [eventSource, setEventSource] = useState<null | EventSource>(null);
  const [id, setId] = useState<null | number>(null);

  useEffect(() => {
    console.log(id);

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
    <EventSourceContext.Provider value={{ eventSource, setId }}>
      {children}
    </EventSourceContext.Provider>
  );
};

export const useID = () => {
  const currentIDContext = useContext(EventSourceContext);

  if (!currentIDContext) {
    throw new Error("useID has to be used within <currentIDContext.Provider>");
  }
  if (!currentIDContext.setId) {
    throw new Error("useID has to be used within <currentIDContext.Provider>");
  }

  return currentIDContext;
};
