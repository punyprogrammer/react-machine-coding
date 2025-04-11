import React, { useEffect, useState } from "react";
import "./styles.css";

const trafficData = [
  {
    color: "red",
    displayOrder: 2,
    lightActive: 3, // This means red is third in activation sequence
    time: 4000,
  },
  {
    color: "green",
    displayOrder: 1,
    lightActive: 2, // Green is second in activation sequence
    time: 2000,
  },
  {
    color: "yellow",
    displayOrder: 3,
    lightActive: 1, // Yellow is first in activation sequence
    time: 3000,
  },
];

export default function TrafficLight() {
  // Sort for display order (vertical arrangement)
  const lightDisplayOrder = [...trafficData].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  // Sort for activation sequence
  const lightActiveOrder = [...trafficData].sort(
    (a, b) => a.lightActive - b.lightActive
  );

  const [activeLight, setActiveLight] = useState(
    lightActiveOrder[0].lightActive
  );

  useEffect(() => {
    const currentActiveItem = lightActiveOrder.find(
      (item) => item.lightActive === activeLight
    );
    const timer = setTimeout(() => {
      const currentIndex = lightActiveOrder.findIndex(
        (item) => item.lightActive === activeLight
      );
      const nextIndex = (currentIndex + 1) % lightActiveOrder.length;
      setActiveLight(lightActiveOrder[nextIndex].lightActive);
    }, currentActiveItem.time);

    return () => clearTimeout(timer);
  }, [activeLight]);

  return (
    <div className="main-content">
      <h3>Traffic light</h3>
      <div className="traffic-lights">
        {lightDisplayOrder.map(({ color, lightActive }) => (
          <Light
            key={color}
            color={color}
            isActive={lightActive === activeLight}
          />
        ))}
      </div>
    </div>
  );
}

function Light({ color, isActive }) {
  const opacity = isActive ? 1 : 0.4;
  return <div className="light" style={{ backgroundColor: color, opacity }} />;
}
