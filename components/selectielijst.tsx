import React from "react";
import { TableHead, TableHeader } from "./ui/table";
import { TableCell, TableRow } from "./ui/table";
import { TableBody } from "./ui/table";
import { SidebarMenuItem } from "./ui/sidebar";
import { Table } from "./ui/table";
import { Badge } from "./ui/badge";
import { SelectielijstRow } from "@/lib/types";
import { useSidebarStore } from "@/store/sidebar-store";
export const Selectielijst = ({
  selectielijstRows,
}: {
  selectielijstRows: SelectielijstRow[];
}) => {
  const { filter } = useSidebarStore();
  const isFiltered = filter === "selectielijst_rows" || filter === "all";
  const tableHeaders =
    selectielijstRows.length > 0
      ? Object.keys(selectielijstRows[0]).filter(
          (key) => key !== "Omschrijving"
        )
      : [];
  return (
    <>
      {isFiltered && (
        <SidebarMenuItem
          key="selectielijst"
          className="mb-2 border rounded-md p-2 overflow-hidden"
        >
          <div className="flex items-start gap-2 w-full mb-2">
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 rounded-md px-2 py-1 text-xs flex items-center shrink-0"
            >
              JURISPRUDENTIE
            </Badge>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">Selectielijst items</div>
            </div>
            <span className="text-muted-foreground mr-2 shrink-0">
              {selectielijstRows.length}
            </span>
          </div>

          <div className="mt-2 max-h-[300px] overflow-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <TableHead key={header} className="text-xs font-medium">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectielijstRows.map((row, index) => (
                  <TableRow key={`row-${index}`} className="hover:bg-muted/50">
                    {tableHeaders.map((header) => (
                      <TableCell
                        key={`${index}-${header}`}
                        className="py-2 text-sm"
                      >
                        {row[header as keyof typeof row]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SidebarMenuItem>
      )}
    </>
  );
};
