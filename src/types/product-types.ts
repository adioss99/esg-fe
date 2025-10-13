import { ApiResponse } from "./api-type";
import { UserType } from "./auth-types";

export type ProductStatusType =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface ProductType {
  id: number;
  referenceNo: string;
  modelName: string;
  quantity: number;
  status: ProductStatusType;
  createdAt: Date;
  updatedAt: Date;
  createdByUser: UserType;
}

export type ProductsResponse = ApiResponse<ProductType[]>;
export type ProductFormResponse = ApiResponse<ProductType>;

export type ProductRequest = { modelName: string; quantity: number };
export type UpdateProductRequest = ProductStatusType;
