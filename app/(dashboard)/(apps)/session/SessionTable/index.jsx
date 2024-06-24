import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Pagination } from "@/components/Pagination";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { getAllOrg } from "@/services/organization";
import toast from "react-hot-toast";
import AddUpdateSession from "../AddUpdateSession";

const SessionTable = () => {
  const [orgDetails, setOrgDetails] = useState(null);
  const [singleOrgDetails, setSingleOrgDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="  font-medium  text-card-foreground/80">
          <div className="flex space-x-3  rtl:space-x-reverse items-center">
            <Avatar className=" rounded-full">
              <AvatarImage src={row?.original?.logoUrl} />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <span className=" text-sm text-card-foreground whitespace-nowrap">
              {row?.original?.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "stregnth",
      header: "Strength",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.getValue("stregnth")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.getValue("phoneNumber")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          {row?.original?.address}, {row?.original?.state}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      // enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              color="secondary"
              className=" h-7 w-7"
              onClick={() => {
                setIsOpen(true);
                setSingleOrgDetails(row?.original);
              }}
            >
              <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className=" h-7 w-7 hover:bg-red-400 hover:border-red-500"
              color="secondary"
            >
              <Icon icon="heroicons:trash" className=" h-4 w-4  " />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getAllOrg({ query: { start: 0, limit: 10 } })
      .then((res) => {
        setOrgDetails(res);
      })
      .catch((error) => toast.error(error));
  }, []);

  const table = useReactTable({
    data: orgDetails?.rows || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-2">
        <Pagination table={table} />
      </div>

      {/* ADD/UPDATE SESSION MODAL */}
      <AddUpdateSession
        open={isOpen}
        handleChange={setIsOpen}
        data={singleOrgDetails}
        clearData={() => setSingleOrgDetails(null)}
      />
    </>
  );
};

export default SessionTable;
