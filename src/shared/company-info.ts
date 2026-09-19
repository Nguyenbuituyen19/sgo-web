import { request, ApiResponse } from "@/shared/client";

export interface CompanyInforResponse {
  id: string;
  companyName: string;
  phone: string;
  hotline: string;
  email: string;
  taxCode: string;
  address: unknown;
  description: string;
  logoUrl: string;
  status: string;
  website: string;
}

export const companyInfoApi = {
  getCompanyInfo(): Promise<ApiResponse<CompanyInforResponse>> {
    return request<CompanyInforResponse>({
      method: "GET",
      url: "/api/v1/company-info",
    });
  },
};
