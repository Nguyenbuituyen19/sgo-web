import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  PROVISION_LABELS,
  ProvisionItem,
  findByCodeOrSlug,
  loadProvisions,
} from "@/shared/provision";
import ServiceLayout from "@/components/service/ServiceLayout";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceContent from "@/components/service/ServiceContent";
import ServicePricing from "@/components/service/ServicePricing";
import ServiceFaq from "@/components/service/ServiceFaq";
import ServiceForm from "@/components/service/ServiceForm";

/**
 * Template chung cho trang dịch vụ, resolve hoàn toàn từ database.
 *
 * Vì sao route này KHÔNG có `generateStaticParams`:
 * mọi route tĩnh ở cấp gốc (`/web`, `/vr360`, `/hop-dong`...) đều được Next ưu
 * tiên hơn segment động, và 10 mã dịch vụ chính đã có trang riêng với thiết kế +
 * JSON-LD riêng. Nhiệm vụ của template này là phục vụ những provision CHƯA có
 * trang riêng (hiện là ~20 provision con như `web-web-biz`, `vr360-hotel`,
 * `cloud-server-linux`, `software-licensing`...) và trả 404 cho URL rác.
 *
 * Nếu khai báo `generateStaticParams` cho các mã đó thì build sẽ phải gọi API và
 * nội dung hero bị đóng băng theo dữ liệu lúc build — đánh đổi không đáng, nên
 * trang được render tại request time và lấy dữ liệu mới mỗi lần.
 */

interface ServicePageProps {
  params: Promise<{ serviceCode: string }>;
}

type Resolution =
  | { status: "found"; provision: ProvisionItem }
  | { status: "missing" }
  | { status: "unavailable" };

/**
 * Tra provision theo code hoặc slug.
 *
 * Phân biệt "không tồn tại" với "không gọi được API": chỉ khi backend trả lời rõ
 * ràng rằng không có provision nào khớp mới trả 404. Nếu API lỗi, trang vẫn hiển
 * thị với nhãn suy ra từ `PROVISION_LABELS` để không đánh sập cả trang vì backend
 * tạm thời không phản hồi.
 */
async function resolveProvision(identifier: string): Promise<Resolution> {
  let provisions: ProvisionItem[];

  try {
    provisions = await loadProvisions();
  } catch {
    return { status: "unavailable" };
  }

  const provision = findByCodeOrSlug(provisions, identifier);
  return provision ? { status: "found", provision } : { status: "missing" };
}

function fallbackLabel(identifier: string): string {
  return PROVISION_LABELS[identifier.toLowerCase()] || identifier;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceCode } = await params;
  const resolution = await resolveProvision(serviceCode);
  const label =
    resolution.status === "found"
      ? resolution.provision.name
      : fallbackLabel(serviceCode);
  const description =
    resolution.status === "found" && resolution.provision.description
      ? resolution.provision.description
      : `Dịch vụ ${label.toLowerCase()} may đo theo yêu cầu tại SGO Việt Nam.`;

  return {
    title: `${label} - SGO Việt Nam`,
    description,
    keywords: [label.toLowerCase(), `dịch vụ ${label.toLowerCase()}`, "sgo việt nam", "sgodata"],
    openGraph: {
      title: `${label} - SGO Việt Nam`,
      description,
      images: ["https://sgodata.com/favicon-sgo.png"],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceCode } = await params;
  const resolution = await resolveProvision(serviceCode);

  if (resolution.status === "missing") notFound();

  const provision =
    resolution.status === "found" ? resolution.provision : undefined;
  const label = provision?.name || fallbackLabel(serviceCode);
  const code = (provision?.code || serviceCode).toLowerCase();

  return (
    <ServiceLayout>
      <ServiceHero label={label} description={provision?.description} />
      <ServiceContent code={code} />
      <ServicePricing code={code} />
      <ServiceFaq code={code} />
      <ServiceForm code={code} label={label} />
    </ServiceLayout>
  );
}
