"use client";
import * as d3 from "d3";
import { useState } from "react";
import LinePlot from "@/components/line-chart";

export default function Home() {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  function onMouseMove(event: React.MouseEvent) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }
  return (
   <div onMouseMove={onMouseMove} className="flex flex-col items-center justify-center h-screen">
    <h1>Wegwijs in Regels</h1>
    <LinePlot data={data} />
   </div>
  );
}
