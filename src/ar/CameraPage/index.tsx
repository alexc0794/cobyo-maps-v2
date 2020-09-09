import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useEvent from "../../hooks/useEvent";
import { Event, EventUser, Position } from "../../interfaces";
import "./index.css";

type EventPageRouteParams = {
  eventId: string;
};

function CameraPage() {
  let { eventId } = useParams<EventPageRouteParams>();
  return <Scene eventId={eventId} />;
}

type SceneProps = {
  eventId: string;
};

function Scene({ eventId }: SceneProps) {
  const SCENE_ELEMENT_ID = "arScene";

  useEffect(() => {
    function initScene() {
      const root = document.getElementById("root");
      if (!root || !root.parentNode) {
        return;
      }
      const scene = document.createElement("a-scene");
      scene.setAttribute("id", SCENE_ELEMENT_ID);
      scene.setAttribute("vr-mode-ui", "enabled: false");
      scene.setAttribute("embedded", "");
      scene.setAttribute("arjs", "sourceType: webcam; debugUIEnabled: false;");
      scene.setAttribute("device-orientation-permission-ui", "enabled: false");

      const camera = document.createElement("a-camera");
      camera.setAttribute("gps-camera", "minDistance: 20");
      camera.setAttribute("rotation-reader", "");
      scene.appendChild(camera);

      root.parentNode.insertBefore(scene, root.nextSibling);
    }

    initScene();
  }, []);

  const { event }: { event: Event | null } = useEvent(eventId);

  if (!event) {
    return null;
  }

  return (
    <>
      {event.eventUsers.map(
        (eventUser: EventUser) =>
          eventUser.position && (
            <SceneMarker
              key={eventUser.name}
              sceneElementId={SCENE_ELEMENT_ID}
              position={eventUser.position}
              title={eventUser.name}
            />
          )
      )}
      <SceneMarker
        sceneElementId={SCENE_ELEMENT_ID}
        position={event.place.position}
        title={event.name}
      />
    </>
  );
}

type SceneMarkerProps = {
  sceneElementId: string;
  position: Position;
  title: string;
};

function SceneMarker({ sceneElementId, position, title }: SceneMarkerProps) {
  useEffect(() => {
    function initSceneMarker() {
      const scene = document.getElementById(sceneElementId);
      if (!scene) {
        return;
      }
      const link = document.createElement("a-link");
      link.setAttribute("scale", "25 25 25");
      link.setAttribute("visualAspectEnabled", "false");
      link.setAttribute("border", "red");
      link.setAttribute("highlighted", "true");
      link.setAttribute("backgroundColor", "red");
      link.setAttribute("title", title);
      link.setAttribute(
        "gps-entity-place",
        `latitude:${position.latitude};longitude:${position.longitude};`
      );
      link.addEventListener("loaded", () => {
        window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
      });
      scene.appendChild(link);
    }

    initSceneMarker();
  }, [sceneElementId, position, title]);
  return <div />;
}

export default CameraPage;
