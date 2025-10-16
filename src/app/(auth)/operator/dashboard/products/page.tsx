"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProductFormDialog } from "./product-form";
import ProductTableComponent from "@/app/_components/product-table";

const ProductPage = () => {
  return (
    <>
      <div className="px-4 flex justify-end">
        <ProductFormDialog
          trigger={
            <Button>
              <PlusCircle /> Add Product
            </Button>
          }
        />
      </div>
      <ProductTableComponent role="OPERATOR"/>
    </>
  );
};

export default ProductPage;
