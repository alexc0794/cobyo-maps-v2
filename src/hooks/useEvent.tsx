import { useEffect, useState } from "react";

import { Event } from "../interfaces";
import { MOCK_EVENT } from "../mocks";

export default function useEvent(eventId: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    async function loadEvent(eventId: string) {
      try {
        const event: Event | null = await Promise.resolve(MOCK_EVENT);
        setEvent(event);
        setLoading(false);
        setError(false);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    loadEvent(eventId);
  }, [eventId]);

  return { event, error, loading };
}
