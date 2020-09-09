import { useEffect, useState } from "react";

import { Event } from "../interfaces";
import { MOCK_EVENT } from "../mocks";

type UseEventType = {
  event: Event | null;
  error: boolean;
  loading: boolean;
};

export default function useEvent(eventId: string): UseEventType {
  const [{ event, error, loading }, setState] = useState<UseEventType>({
    event: null,
    error: false,
    loading: true
  });

  useEffect(() => {
    async function loadEvent(eventId: string) {
      try {
        const event: Event | null = await Promise.resolve(MOCK_EVENT);
        setState({
          event,
          loading: false,
          error: false
        });
      } catch (err) {
        console.log(err);
        setState({
          event: null,
          loading: false,
          error: true
        });
      }
    }
    loadEvent(eventId);
  }, [eventId]);

  return { event, error, loading };
}
