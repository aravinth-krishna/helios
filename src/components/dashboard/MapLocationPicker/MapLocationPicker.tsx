"use client";

import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapLocationPickerProps {
  onLocationChange: (latLng: { lat: number; lng: number }) => void; // Prop to pass location to parent
}

const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  onLocationChange,
}) => {
  // Destructure onLocationChange prop
  const [clickedLatLng, setClickedLatLng] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  function MapEvents() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setClickedLatLng({ lat, lng });
        onLocationChange({ lat, lng }); // Call the onLocationChange prop to pass data to parent
      },
    });
    return null;
  }

  return (
    <div>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {clickedLatLng && (
          <Marker position={[clickedLatLng.lat, clickedLatLng.lng]}>
            <Popup>
              Latitude: {clickedLatLng.lat.toFixed(4)}
              <br />
              Longitude: {clickedLatLng.lng.toFixed(4)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {clickedLatLng && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p>Clicked Location:</p>
          <p>
            Latitude: <strong>{clickedLatLng.lat.toFixed(4)}</strong>,
            Longitude: <strong>{clickedLatLng.lng.toFixed(4)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default MapLocationPicker;
