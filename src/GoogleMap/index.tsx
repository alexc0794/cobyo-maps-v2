import React, { useCallback, useEffect, useRef } from "react";

import useGoogleMaps from "../hooks/useGoogleMaps";
import "./index.css";

type MapProps = {
  options: any;
  onMount: any;
};

function GoogleMap({ options, onMount }: MapProps) {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const onLoad = useCallback(() => {
    const map = new window.google.maps.Map(ref.current, options);
    onMount && onMount(map);
  }, [onMount, options, ref]);

  const isGoogleLoaded = useGoogleMaps();
  useEffect(() => {
    if (isGoogleLoaded) {
      onLoad();
    }
  }, [isGoogleLoaded, onLoad]);

  return <div ref={ref} className="GoogleMap" />;
}

export default GoogleMap;
