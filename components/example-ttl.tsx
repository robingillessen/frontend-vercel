' use client'
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Parser } from "n3";

// Dummy TTL RDF Data
const turtleData = `
  @prefix schema: <https://schema.org/> .
  <http://example.com/john-doe> a schema:Person ;
      schema:name "John Doe" ;
      schema:knows <http://example.com/jane-smith> ;
      schema:worksFor <http://example.com/techcorp> .

  <http://example.com/jane-smith> a schema:Person ;
      schema:name "Jane Smith" .

  <http://example.com/techcorp> a schema:Organization ;
      schema:name "TechCorp" .
`;

const convertTTLtoJSONLD = (ttl) => {
  const parser = new Parser();
  const triples = [];

  parser.parse(ttl, (error, triple) => {
    if (triple) {
      console.log(triple);
      console.log(' -----');
      triples.push(triple);
    }
  });

  const jsonLD = { "@context": "https://schema.org/", "@graph": [] };
  triples.forEach(({ subject, predicate, object }) => {
    // Extract the .value if present, or use the value directly
    console.log('subject', subject);
    console.log('predicate', predicate);
    console.log('object', object);
    const s = subject.value || subject;
    const p = predicate.value || predicate;
    const o = object.value || object;

    console.log(s, p, o);

    let node = jsonLD["@graph"].find((n) => n["@id"] === s);
    if (!node) {
      node = { "@id": s };
      jsonLD["@graph"].push(node);
    }

    if (p.includes("name")) {
      // Since object is now a string, you can remove quotes if needed.
      node["name"] = o;
    } else {
      // This change helps with predicates that use slashes instead of "#"
      const key = p.lastIndexOf('#') !== -1 ? p.split('#').pop() : p.split('/').pop();
      node[key] = o;
    }
  });

  return jsonLD;
};

const GraphView = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600, height = 400;
    const nodes = data["@graph"].map((n) => ({ id: n["@id"], label: n.name || n["@type"] }));
    const links = [];
    data["@graph"].forEach((n) => {
      if (n.knows) links.push({ source: n["@id"], target: n.knows });
      if (n.worksFor) links.push({ source: n["@id"], target: n.worksFor });
    });

    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll(".link").data(links).enter().append("line").attr("class", "link").style("stroke", "#aaa");
    const node = svg.selectAll(".node").data(nodes).enter().append("circle").attr("class", "node").attr("r", 10).style("fill", "#69b3a2");
    const label = svg.selectAll(".label").data(nodes).enter().append("text").attr("dy", -10).attr("text-anchor", "middle").text(d => d.label).style("font-size", "12px");

    simulation.on("tick", () => {
      node.attr("cx", d => d.x).attr("cy", d => d.y);
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      label.attr("x", d => d.x).attr("y", d => d.y);
    });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

const App = () => {
  const [jsonLD, setJsonLD] = useState(null);
  useEffect
  useEffect(() => {
    console.log(turtleData);
    setJsonLD(convertTTLtoJSONLD(turtleData));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2>TTL RDF naar JSON-LD Visualisatie</h2>
      {jsonLD && <GraphView data={jsonLD} />}
    </div>
  );
};

export default App;
