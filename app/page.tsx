"use client";
import TableSkeleton from "@/components/skeleton-loaders/tanstack-table-loader";
import { Button } from "@/components/ui/button";
import { NodeSimulation } from "@/components/node-simulation";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {

  return (
  <div className="flex flex-col items-center justify-center h-screen relative">
    <Image className="absolute top-0 left-0 right-0 translate-x-1/2 object-cover" src="/logo-compact-blauw.svg" alt="Logo Rijksoverheid" width={500} height={500} />
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-center pb-5">Vraag het aan jouw digitale jurist</h1>
      <p className="text-center pb-5 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. At totam necessitatibus, autem, id consectetur ea et cumque debitis quasi animi repellendus possimus aspernatur ut perferendis neque voluptatum iure sunt earum.</p>
      <Textarea />
    </div>
    <p className="text-xs absolute bottom-0 left-0 right-0 text-center pb-4"><strong>Jouw digitale jurist</strong> kan fouten maken, het is belangrijk om antwoorden te controleren</p>
  </div>
  );
}
