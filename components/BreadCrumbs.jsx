"use client";

import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import Link from "next/link";

const BreadCrumbs = ({ items }) => {
  return (
    <Breadcrumbs>
      {items.map((item, index) => (
        <BreadcrumbItem key={index}>
          <Link href={item?.path ?? "/"}>{item?.name}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
