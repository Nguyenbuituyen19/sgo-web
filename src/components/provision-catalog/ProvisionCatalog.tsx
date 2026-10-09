"use client";

import {
  type FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { submitConsultation } from "@/shared/client";
import {
  ProvisionItem,
  ProvisionServiceItem,
  getChildren,
  getProvisionServices,
  getProvisionRoute,
  isCategoryProvision,
  normalizeProvisionServices,
} from "@/shared/provision";
import { useProvisions } from "@/hooks/useProvisions";
import { useAsyncData } from "@/hooks/useAsyncData";
import { CACHE_TTL, cacheKey } from "@/lib/cache";

type ViewMode = "list" | "grid";
type SortMode = "popular" | "name";
const ALL_FILTERS_TAB = "__all__";
const MAX_PACKAGES_PER_TAB = 10;

interface CatalogFilterTab {
  id: string;
  name: string;
  packages: ProvisionServiceItem[];
}

interface CatalogGroup {
  id: string;
  childProvisionId: string;
  provisionCode: string;
  name: string;
  code: string;
  displayOrder: number;
  href: string;
  packages: ProvisionServiceItem[];
  filterTabs: CatalogFilterTab[];
}

interface CatalogCategory {
  provision: ProvisionItem;
  childProvisions: ProvisionItem[];
  groups: CatalogGroup[];
}

const CATEGORY_ICONS: Record<string, string> = {
  "ha-tang": "fa-solid fa-cloud",
  erp: "fa-solid fa-chart-pie",
  web: "fa-solid fa-laptop-code",
  vr360: "fa-solid fa-cube",
  pos: "fa-solid fa-cash-register",
  zns: "fa-solid fa-comment-sms",
  "software-licensing": "fa-solid fa-key",
  "ban-quyen": "fa-solid fa-key",
  "qr-code": "fa-solid fa-qrcode",
  "truy-xuat": "fa-solid fa-shield-halved",
  "hop-dong": "fa-solid fa-file-signature",
  email: "fa-solid fa-envelope",
};

const CATEGORY_LABELS: Record<string, string> = {
  "ha-tang": "Cloud Server",
  erp: "ERP / CRM",
  web: "Website",
  vr360: "VR360",
  pos: "POS",
  zns: "ZNS",
  "software-licensing": "Bản quyền phần mềm",
  "ban-quyen": "Bản quyền phần mềm",
  "qr-code": "QR Code",
  "truy-xuat": "Truy xuất nguồn gốc",
  "hop-dong": "Hợp đồng điện tử",
  email: "Email doanh nghiệp",
};

const CATALOG_SERVICES_KEY = `${cacheKey.pricing("catalog")}:all`;

function provisionLabel(provision: ProvisionItem): string {
  if (provision.name.trim().toLowerCase() !== provision.code.toLowerCase()) {
    return provision.name;
  }

  return provision.code
    .split("-")
    .map((word) => word.charAt(0).toLocaleUpperCase("vi") + word.slice(1))
    .join(" ");
}

function categoryLabel(provision: ProvisionItem): string {
  return CATEGORY_LABELS[provision.code.toLowerCase()] || provisionLabel(provision);
}

function descendantsOf(
  root: ProvisionItem,
  tree: Map<string, ProvisionItem[]>
): ProvisionItem[] {
  const descendants: ProvisionItem[] = [];
  const queue = [root];
  const visited = new Set([root.id]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) continue;

    for (const child of getChildren(tree, current.id)) {
      if (visited.has(child.id)) continue;
      visited.add(child.id);
      descendants.push(child);
      queue.push(child);
    }
  }

  return descendants;
}

function routeForPackage(
  source: ProvisionItem | undefined,
  category: ProvisionItem,
  provisionById: Map<string, ProvisionItem>
): string {
  let current = source;
  const visited = new Set<string>();

  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    if (
      !isCategoryProvision(current) &&
      current.type?.trim().toLowerCase() !== "service-filter"
    ) {
      return getProvisionRoute(current.code, current.slug);
    }
    current = current.parentId
      ? provisionById.get(current.parentId)
      : undefined;
  }

  return getProvisionRoute(category.code, category.slug);
}

function buildCatalogCategory(
  category: ProvisionItem,
  provisions: ProvisionItem[],
  services: ProvisionServiceItem[]
): CatalogCategory {
  const provisionById = new Map(provisions.map((item) => [item.id, item]));
  const tree = new Map<string, ProvisionItem[]>();

  for (const provision of provisions) {
    if (!provision.parentId) continue;
    const children = tree.get(provision.parentId) ?? [];
    children.push(provision);
    tree.set(provision.parentId, children);
  }

  const descendants = descendantsOf(category, tree);
  const allowedIds = new Set([category.id, ...descendants.map(({ id }) => id)]);
  const activeServices = services.filter(
    (service) =>
      allowedIds.has(service.provisionId) &&
      service.status?.trim().toUpperCase() !== "INACTIVE"
  );
  const childProvisions = (tree.get(category.id) ?? [])
    .filter((provision) => provision.status?.trim().toUpperCase() === "ACTIVE")
    .sort(
      (a, b) =>
        (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
        a.code.localeCompare(b.code, "vi")
    );
  const serviceProvisions = descendants.filter(
    (provision) => provision.type?.trim().toLowerCase() === "service"
  );
  const groups: CatalogGroup[] = [];

  for (const serviceProvision of serviceProvisions) {
    let childProvision = serviceProvision;
    const childVisited = new Set<string>();
    while (
      childProvision.parentId !== category.id &&
      childProvision.parentId &&
      !childVisited.has(childProvision.id)
    ) {
      childVisited.add(childProvision.id);
      const parent = provisionById.get(childProvision.parentId);
      if (!parent) break;
      childProvision = parent;
    }
    const serviceDescendants = descendantsOf(serviceProvision, tree);
    const filterProvisions = serviceDescendants.filter((provision) => {
      if (
        provision.type?.trim().toLowerCase() !== "service-filter" ||
        provision.status?.trim().toUpperCase() !== "ACTIVE"
      ) {
        return false;
      }

      let parent = provision.parentId
        ? provisionById.get(provision.parentId)
        : undefined;
      const visited = new Set<string>();
      while (parent && !visited.has(parent.id)) {
        visited.add(parent.id);
        if (parent.type?.trim().toLowerCase() === "service") {
          return parent.id === serviceProvision.id;
        }
        parent = parent.parentId
          ? provisionById.get(parent.parentId)
          : undefined;
      }
      return false;
    });
    const filterTabs = filterProvisions.map((filter) => ({
      id: filter.id,
      name: provisionLabel(filter),
      packages: activeServices.filter((service) => service.provisionId === filter.id),
    }));
    const groupPackages = activeServices.filter(
      (service) => service.provisionId === serviceProvision.id
    );

    if (
      groupPackages.length === 0 &&
      !filterTabs.some((tab) => tab.packages.length > 0)
    ) {
      continue;
    }

    groups.push({
      id: serviceProvision.id,
      childProvisionId:
        childProvision.parentId === category.id ? childProvision.id : "",
      provisionCode: category.code,
      name: provisionLabel(serviceProvision),
      code: serviceProvision.code,
      displayOrder: serviceProvision.displayOrder ?? 0,
      href: routeForPackage(serviceProvision, category, provisionById),
      packages: groupPackages,
      filterTabs,
    });
  }

  const categoryPackages = activeServices.filter(
    (service) => service.provisionId === category.id
  );
  if (categoryPackages.length > 0) {
    groups.push({
      id: category.id,
      childProvisionId: "",
      provisionCode: category.code,
      name: categoryLabel(category),
      code: category.code,
      displayOrder: category.displayOrder ?? 0,
      href: routeForPackage(category, category, provisionById),
      packages: categoryPackages,
      filterTabs: [],
    });
  }

  return {
    provision: category,
    childProvisions,
    groups: groups
      .map((group) => ({
        ...group,
        packages: [...group.packages].sort(
          (a, b) =>
            (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
            a.name.localeCompare(b.name, "vi")
        ),
        filterTabs: group.filterTabs.map((tab) => ({
          ...tab,
          packages: [...tab.packages].sort(
            (a, b) =>
              (a.displayOrder ?? 0) - (b.displayOrder ?? 0) ||
              a.name.localeCompare(b.name, "vi")
          ),
        })),
      }))
      .sort(
        (a, b) =>
          a.displayOrder - b.displayOrder ||
          a.name.localeCompare(b.name, "vi")
      ),
  };
}

function packageMatches(
  service: ProvisionServiceItem,
  group: CatalogGroup,
  categoryName: string,
  searchTerm: string
): boolean {
  if (!searchTerm) return true;
  const searchable = [
    service.name,
    service.sku,
    group.name,
    categoryName,
    ...service.featuresIncluded,
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase("vi");

  return searchable.includes(searchTerm);
}

function selectedFilterId(
  group: CatalogGroup,
  selection?: string
): string {
  return (
    selection ??
    (group.packages.length > 0
      ? ALL_FILTERS_TAB
      : group.filterTabs[0]?.id ?? ALL_FILTERS_TAB)
  );
}

function packagesForGroup(
  group: CatalogGroup,
  selection?: string,
  sortMode?: SortMode
): ProvisionServiceItem[] {
  if (group.filterTabs.length === 0) return group.packages;
  const activeTab = selectedFilterId(group, selection);

  if (activeTab === ALL_FILTERS_TAB) {
    const packages = [...group.packages, ...group.filterTabs.flatMap((tab) => tab.packages)];
    const uniquePackages = [
      ...new Map(packages.map((service) => [service.id, service])).values(),
    ];
    return sortMode === "name"
      ? uniquePackages.sort((a, b) => a.name.localeCompare(b.name, "vi"))
      : uniquePackages;
  }

  const packages =
    group.filterTabs.find((tab) => tab.id === activeTab)?.packages ?? [];
  return sortMode === "name"
    ? [...packages].sort((a, b) => a.name.localeCompare(b.name, "vi"))
    : packages;
}

function formatPrice(price: number): string {
  return price > 0 ? `${price.toLocaleString("vi-VN")}đ` : "Liên hệ";
}

function formatBillingCycle(cycle?: string): string {
  if (!cycle) return "";
  const labels: Record<string, string> = {
    month: "/ tháng",
    monthly: "/ tháng",
    yearly: "/ năm",
    one_time: "trọn gói",
    onetime: "trọn gói",
  };
  return labels[cycle.toLowerCase()] ?? "";
}

function ConsultationModal({
  service,
  provisionCode,
  onClose,
}: {
  service: ProvisionServiceItem;
  provisionCode: string;
  onClose: () => void;
}) {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [requirement, setRequirement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSubmitting, onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(phoneNumber)) {
      alert("Sai định dạng số điện thoại");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitConsultation({
        provisionCode,
        customerName,
        phoneNumber,
        email: email || undefined,
        extraFields: {
          serviceName: service.name,
          requirement,
        },
      });

      if (!response.success) {
        alert(
          response.message || "Không thể gửi yêu cầu tư vấn. Vui lòng thử lại."
        );
        return;
      }

      alert(
        `Đã gửi yêu cầu tư vấn cho ${service.name}. Chuyên viên SGO sẽ liên hệ lại trong vòng 24 giờ.`
      );
      onClose();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Không thể gửi yêu cầu tư vấn. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <section
        aria-labelledby="consultation-modal-title"
        aria-modal="true"
        className="my-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
        role="dialog"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="consultation-modal-title"
              className="text-xl font-bold text-slate-900"
            >
              Yêu cầu tư vấn
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Để lại thông tin, chuyên viên sẽ liên hệ trong vòng 24 giờ.
            </p>
          </div>
          <button
            type="button"
            aria-label="Đóng biểu mẫu"
            disabled={isSubmitting}
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-blue-700 disabled:opacity-50"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="consultation-service-name"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Gói dịch vụ quan tâm
            </label>
            <input
              id="consultation-service-name"
              readOnly
              value={service.name}
              className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-700"
            />
          </div>
          <div>
            <label
              htmlFor="consultation-customer-name"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Họ và tên *
            </label>
            <input
              id="consultation-customer-name"
              required
              autoComplete="name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="consultation-phone"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Số điện thoại / Zalo *
              </label>
              <input
                id="consultation-phone"
                required
                type="tel"
                autoComplete="tel"
                value={phoneNumber}
                onChange={(event) =>
                  setPhoneNumber(event.target.value.replace(/[^0-9+]/g, ""))
                }
                placeholder="0912345678"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="consultation-email"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Email
              </label>
              <input
                id="consultation-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email@congty.vn"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="consultation-requirement"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Nội dung cần tư vấn
            </label>
            <textarea
              id="consultation-requirement"
              rows={3}
              value={requirement}
              onChange={(event) => setRequirement(event.target.value)}
              placeholder="Mô tả nhu cầu hoặc câu hỏi của bạn"
              className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
          </button>
        </form>
      </section>
    </div>
  );
}

function PackageCard({
  service,
  group,
  viewMode,
  ordinal,
  onContact,
}: {
  service: ProvisionServiceItem;
  group: CatalogGroup;
  viewMode: ViewMode;
  ordinal: number;
  onContact: (service: ProvisionServiceItem, provisionCode: string) => void;
}) {
  const isList = viewMode === "list";

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition-colors hover:border-blue-200 ${
        isList
          ? "flex h-32 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          : "flex h-64 flex-col"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold tabular-nums text-blue-800"
          >
            {String(ordinal).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h3 className="font-bold leading-snug text-slate-900">{service.name}</h3>
            <p className="mt-1 text-xs text-slate-500">{group.name}</p>
          </div>
        </div>

        {service.featuresIncluded.length > 0 && (
          <ul className="mt-4 flex max-h-12 flex-wrap gap-x-5 gap-y-2 overflow-hidden text-sm text-slate-600">
            {service.featuresIncluded.slice(0, 3).map((feature, index) => (
              <li key={`${service.id}-${index}`} className="flex items-start gap-2">
                <i
                  className="fa-solid fa-check mt-1 text-xs text-emerald-600"
                  aria-hidden="true"
                ></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        className={`flex items-center justify-between gap-4 ${
          isList
            ? "sm:min-w-52 sm:justify-end"
            : "mt-auto border-t border-slate-100 pt-4"
        }`}
      >
        <div>
          <p className="text-lg font-extrabold text-slate-950">
            {formatPrice(service.price)}
          </p>
          {service.price > 0 && formatBillingCycle(service.billingCycle) && (
            <p className="mt-0.5 text-xs text-slate-500">
              {formatBillingCycle(service.billingCycle)}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onContact(service, group.provisionCode)}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 active:scale-[0.98]"
        >
          Liên hệ ngay
        </button>
      </div>
    </article>
  );
}

export default function ProvisionCatalog({
  initialCategoryCode,
}: {
  initialCategoryCode?: string;
}) {
  const { provisions, loading: provisionsLoading, error: provisionsError } =
    useProvisions();
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedChildIds, setSelectedChildIds] = useState<Record<string, string>>({});
  const [selectedFilterIds, setSelectedFilterIds] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [consultationRequest, setConsultationRequest] = useState<{
    service: ProvisionServiceItem;
    provisionCode: string;
  } | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("popular");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const loadServices = useCallback(async () => {
    const response = await getProvisionServices();
    if (!response.success || !response.data) {
      throw new Error(response.message || "Không thể tải danh sách gói dịch vụ.");
    }
    return normalizeProvisionServices(response.data);
  }, []);
  const {
    data: services,
    loading: servicesLoading,
    error: servicesError,
    refresh,
  } = useAsyncData(CATALOG_SERVICES_KEY, loadServices, {
    ttl: CACHE_TTL.SERVICES,
    errorMessage: "Không thể tải danh sách gói dịch vụ.",
  });

  const categories = useMemo(
    () =>
      provisions
        .filter(
          (item) =>
            isCategoryProvision(item) &&
            item.type?.trim().toLowerCase() === "category" &&
            item.code?.toLowerCase() !== "contact" &&
            item.status?.trim().toUpperCase() !== "INACTIVE"
        )
        .map((category) =>
          buildCatalogCategory(category, provisions, services ?? [])
        )
        .filter(({ groups }) =>
          groups.some(
            (group) =>
              group.packages.length > 0 ||
              group.filterTabs.some((tab) => tab.packages.length > 0)
          )
        ),
    [provisions, services]
  );

  const categoryFromRoute = useMemo(() => {
    if (!initialCategoryCode) return undefined;
    const target = provisions.find(
      (item) =>
        item.code?.toLocaleLowerCase("vi") ===
          initialCategoryCode.toLocaleLowerCase("vi") ||
        item.slug?.toLocaleLowerCase("vi") ===
          initialCategoryCode.toLocaleLowerCase("vi")
    );
    if (!target) return undefined;

    const provisionById = new Map(provisions.map((item) => [item.id, item]));
    let current: ProvisionItem | undefined = target;
    const visited = new Set<string>();
    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      if (current.type?.trim().toLowerCase() === "category") {
        return categories.find(({ provision }) => provision.id === current?.id);
      }
      current = current.parentId
        ? provisionById.get(current.parentId)
        : undefined;
    }
    return undefined;
  }, [categories, initialCategoryCode, provisions]);
  const selectedCategory =
    categories.find(({ provision }) => provision.id === selectedCategoryId) ??
    categoryFromRoute ??
    categories.find(({ provision, groups }) =>
      ["ha-tang", "cloud-server"].includes(provision.code.toLowerCase()) ||
      (groups.length > 0 && provision.name.toLowerCase().includes("cloud"))
    ) ??
    categories.find(({ groups }) => groups.length > 0) ??
    categories[0];
  const normalizedSearch = search.trim().toLocaleLowerCase("vi");
  const visibleCategories = useMemo(() => {
    const targetCategories = normalizedSearch
      ? categories
      : selectedCategory
        ? [selectedCategory]
        : [];

    const matches = targetCategories
      .map((category) => {
        const selectedChildId = selectedChildIds[category.provision.id];
        const groups = category.groups
          .filter(
            (group) =>
              normalizedSearch ||
              category.provision.id !== selectedCategory?.provision.id ||
              !selectedChildId ||
              selectedChildId === ALL_FILTERS_TAB ||
              group.childProvisionId === selectedChildId
          )
          .map((group) => ({
            ...group,
            packages: group.packages.filter((service) =>
              packageMatches(
                service,
                group,
                categoryLabel(category.provision),
                normalizedSearch
              )
            ),
            filterTabs: group.filterTabs.map((tab) => ({
              ...tab,
              packages: tab.packages.filter((service) =>
                packageMatches(
                  service,
                  group,
                  categoryLabel(category.provision),
                  normalizedSearch
                )
              ),
            })),
          }))
          .filter(
            (group) =>
              !normalizedSearch ||
              packagesForGroup(
                group,
                selectedFilterIds[group.id],
                sortMode
              ).length > 0
          );

      if (sortMode === "name") {
        groups.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        for (const group of groups) {
          group.packages.sort((a, b) => a.name.localeCompare(b.name, "vi"));
          for (const tab of group.filterTabs) {
            tab.packages.sort((a, b) => a.name.localeCompare(b.name, "vi"));
          }
        }
      }

        return { ...category, groups };
      })
      .filter((category) => category.groups.length > 0);

    return sortMode === "name" && normalizedSearch
      ? matches.sort((a, b) =>
          a.provision.name.localeCompare(b.provision.name, "vi")
        )
      : matches;
  }, [
    categories,
    normalizedSearch,
    selectedCategory,
    selectedChildIds,
    selectedFilterIds,
    sortMode,
  ]);
  const allVisiblePackages = visibleCategories.flatMap((category) =>
    category.groups.flatMap((group) =>
      packagesForGroup(group, selectedFilterIds[group.id], sortMode).map(
        (service) => ({ category, group, service })
      )
    )
  );
  const totalPages = Math.ceil(allVisiblePackages.length / MAX_PACKAGES_PER_TAB);
  const activePage = Math.min(currentPage, Math.max(1, totalPages));
  const pagePackages = allVisiblePackages.slice(
    (activePage - 1) * MAX_PACKAGES_PER_TAB,
    activePage * MAX_PACKAGES_PER_TAB
  );

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        event.key !== "/" ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      document.getElementById("provision-catalog-search")?.focus();
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const loading = provisionsLoading || servicesLoading;
  const error = provisionsError || servicesError;
  const showInitialSkeleton = loading && categories.length === 0;
  const showPackageSkeleton = servicesLoading && services === null;

  return (
    <>
      <section className="bg-[#111936] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-slate-300">
            <Link href="/" className="hover:text-white">
              Trang chủ
            </Link>
            <span className="mx-2 text-slate-500">/</span>
            <span aria-current="page">Danh mục dịch vụ</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-100">
              <i className="fa-solid fa-layer-group" aria-hidden="true"></i>
              Hệ sinh thái giải pháp SGO Việt Nam
            </span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Giải pháp công nghệ cho doanh nghiệp
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Khám phá dịch vụ Cloud, ERP, Website và các giải pháp số phù hợp
              với nhu cầu vận hành của bạn.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Tìm dịch vụ</span>
              <i
                className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"
                aria-hidden="true"
              ></i>
              <input
                id="provision-catalog-search"
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Tìm dịch vụ: Cloud, ERP, Website..."
                aria-keyshortcuts="/"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-14 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-500">
                /
              </kbd>
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  aria-pressed={sortMode === "popular"}
                  onClick={() => {
                    setSortMode("popular");
                    setCurrentPage(1);
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    sortMode === "popular"
                      ? "bg-indigo-50 text-indigo-800"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  <i className="fa-solid fa-arrow-trend-up mr-1.5" aria-hidden="true"></i>
                  Phổ biến nhất
                </button>
                <button
                  type="button"
                  aria-pressed={sortMode === "name"}
                  onClick={() => {
                    setSortMode("name");
                    setCurrentPage(1);
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    sortMode === "name"
                      ? "bg-indigo-50 text-indigo-800"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  Tên A-Z
                </button>
              </div>

              <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  aria-label="Hiển thị dạng lưới"
                  aria-pressed={viewMode === "grid"}
                  onClick={() => setViewMode("grid")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-800 text-white"
                      : "text-slate-500 hover:bg-white"
                  }`}
                >
                  <i className="fa-solid fa-grip" aria-hidden="true"></i>
                </button>
                <button
                  type="button"
                  aria-label="Hiển thị dạng danh sách"
                  aria-pressed={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-800 text-white"
                      : "text-slate-500 hover:bg-white"
                  }`}
                >
                  <i className="fa-solid fa-list" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-[17.5rem_minmax(0,1fr)]">
            <aside aria-label="Danh mục dịch vụ">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <h2 className="flex items-center gap-2 px-2 py-2 text-[11px] font-bold tracking-wide text-slate-500">
                  <i className="fa-solid fa-filter text-blue-700" aria-hidden="true"></i>
                  DANH MỤC DỊCH VỤ
                </h2>

                {showInitialSkeleton ? (
                  <div className="space-y-2 p-1" aria-label="Đang tải danh mục">
                    {[0, 1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-10 animate-pulse rounded-lg bg-slate-100"
                      />
                    ))}
                  </div>
                ) : categories.length === 0 ? (
                  <p className="px-2 py-4 text-sm text-slate-600">
                    Chưa có danh mục dịch vụ.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {categories.map(({ provision, groups }) => {
                      const isSelected = selectedCategory?.provision.id === provision.id;
                      const icon =
                        CATEGORY_ICONS[provision.code.toLowerCase()] ||
                        "fa-solid fa-cube";
                      const groupCount = groups.length;

                      return (
                        <li key={provision.id}>
                          <button
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => {
                              setSelectedCategoryId(provision.id);
                              setCurrentPage(1);
                            }}
                            className={`flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                              isSelected
                                ? "bg-blue-50 text-blue-900"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <i
                              className={`${icon} w-4 text-center ${
                                isSelected ? "text-blue-700" : "text-slate-500"
                              }`}
                              aria-hidden="true"
                            ></i>
                            <span className="min-w-0 flex-1 truncate">
                              {categoryLabel(provision)}
                            </span>
                            <span
                              className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] ${
                                isSelected
                                  ? "bg-white text-blue-800"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                              title={`${groupCount} nhóm dịch vụ`}
                            >
                              {groupCount}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </aside>

            <section aria-labelledby="catalog-category-heading" className="min-w-0">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2
                  id="catalog-category-heading"
                  className="text-xl font-bold text-slate-900 sm:text-2xl"
                >
                  {normalizedSearch
                    ? "Kết quả tìm kiếm"
                    : selectedCategory
                    ? `Gói dịch vụ ${categoryLabel(selectedCategory.provision)}`
                    : "Danh sách dịch vụ"}
                </h2>
                {!normalizedSearch && selectedCategory?.childProvisions.length ? (
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <span className="sr-only">Lọc theo dịch vụ con</span>
                    <select
                      aria-label="Lọc theo dịch vụ con"
                      value={
                        selectedChildIds[selectedCategory.provision.id] ??
                        ALL_FILTERS_TAB
                      }
                      onChange={(event) =>
                        {
                          setSelectedChildIds((current) => ({
                            ...current,
                            [selectedCategory.provision.id]: event.target.value,
                          }));
                          setCurrentPage(1);
                        }
                      }
                      className="max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value={ALL_FILTERS_TAB}>Tất cả dịch vụ</option>
                      {selectedCategory.childProvisions.map((child) => (
                        <option key={child.id} value={child.id}>
                          {provisionLabel(child)}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
              </div>

              {showInitialSkeleton ? (
                <div className="space-y-3" aria-label="Đang tải dịch vụ">
                  {[0, 1, 2].map((item) => (
                    <div
                      key={item}
                      className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white"
                    />
                  ))}
                </div>
              ) : showPackageSkeleton ? (
                <div className="space-y-3" aria-label="Đang tải dịch vụ">
                  {[0, 1, 2].map((item) => (
                    <div
                      key={item}
                      className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-white"
                    />
                  ))}
                </div>
              ) : error ? (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-200 bg-white p-6 text-sm text-red-700"
                >
                  <p>{error}</p>
                  <button
                    type="button"
                    onClick={refresh}
                    className="mt-3 font-semibold underline underline-offset-2"
                  >
                    Thử tải lại
                  </button>
                </div>
              ) : visibleCategories.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center">
                  <i
                    className="fa-solid fa-magnifying-glass mb-3 text-xl text-slate-400"
                    aria-hidden="true"
                  ></i>
                  <p className="font-semibold text-slate-800">
                    {normalizedSearch
                      ? "Không tìm thấy gói dịch vụ phù hợp."
                      : "Danh mục này chưa có gói dịch vụ."}
                  </p>
                  {normalizedSearch && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setCurrentPage(1);
                      }}
                      className="mt-2 text-sm font-semibold text-blue-800 hover:underline"
                    >
                      Xóa nội dung tìm kiếm
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {visibleCategories.map((category) => {
                    return (
                    <section key={category.provision.id}>
                      {normalizedSearch && (
                        <h3 className="mb-3 text-base font-bold text-slate-900">
                          {categoryLabel(category.provision)}
                        </h3>
                      )}
                      <div className="space-y-5">
                        {category.groups
                          .map((group) => {
                            const groupPagePackages = pagePackages
                              .filter(
                                (entry) =>
                                  entry.category.provision.id ===
                                    category.provision.id &&
                                  entry.group.id === group.id
                              )
                              .map((entry) => entry.service);
                            const hasPackages = packagesForGroup(
                              group,
                              selectedFilterIds[group.id],
                              sortMode
                            ).length > 0;
                            if (groupPagePackages.length === 0 && hasPackages) {
                              return null;
                            }

                            return (
                            <section
                              key={group.id}
                              aria-label={`Gói dịch vụ ${group.name}`}
                            >
                              {group.filterTabs.length > 0 && (
                                <div className="mb-2 flex justify-end">
                                  <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                    <span className="sr-only">
                                      Chọn nhóm dịch vụ cho {group.name}
                                    </span>
                                    <select
                                      aria-label={`Chọn nhóm dịch vụ cho ${group.name}`}
                                      value={selectedFilterId(
                                        group,
                                        selectedFilterIds[group.id]
                                      )}
                                      onChange={(event) => {
                                        const filterId = event.target.value;
                                        setSelectedFilterIds((current) => ({
                                          ...current,
                                          [group.id]: filterId,
                                        }));
                                        setCurrentPage(1);
                                      }}
                                      className="max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    >
                                      {group.packages.length > 0 && (
                                        <option value={ALL_FILTERS_TAB}>
                                          Tất cả
                                        </option>
                                      )}
                                      {group.filterTabs.map((tab) => (
                                        <option key={tab.id} value={tab.id}>
                                          {tab.name} ({tab.packages.length})
                                        </option>
                                      ))}
                                    </select>
                                  </label>
                                </div>
                              )}
                              {!hasPackages ? (
                                <p className="rounded-xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
                                  {normalizedSearch
                                    ? "Không tìm thấy gói dịch vụ trong nhóm này."
                                    : "Nhóm dịch vụ này hiện chưa có gói."}
                                </p>
                              ) : (
                                <div
                                  className={
                                    viewMode === "list"
                                      ? "space-y-3"
                                      : "grid gap-3 sm:grid-cols-2"
                                  }
                                >
                                  {groupPagePackages.map((service) => (
                                    <PackageCard
                                      key={service.id}
                                      service={service}
                                      group={group}
                                      viewMode={viewMode}
                                      ordinal={
                                        (activePage - 1) * MAX_PACKAGES_PER_TAB +
                                        pagePackages.findIndex(
                                          (entry) => entry.service.id === service.id
                                        ) +
                                        1
                                      }
                                      onContact={(selectedService, provisionCode) =>
                                        setConsultationRequest({
                                          service: selectedService,
                                          provisionCode,
                                        })
                                      }
                                    />
                                  ))}
                                </div>
                              )}
                            </section>
                            );
                          })}
                      </div>
                    </section>
                    );
                  })}
                  {totalPages > 1 && (
                    <nav
                      aria-label="Phân trang danh sách dịch vụ"
                      className="flex items-center justify-end gap-3"
                    >
                      <button
                        type="button"
                        disabled={activePage === 1}
                        onClick={() => setCurrentPage(activePage - 1)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Trước
                      </button>
                      <span className="text-sm text-slate-600">
                        Trang {activePage} / {totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={activePage === totalPages}
                        onClick={() => setCurrentPage(activePage + 1)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Tiếp
                      </button>
                    </nav>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 pb-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-2xl bg-[#111936] p-6 text-white sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-bold">Chọn đúng giải pháp. Bắt đầu hiệu quả.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Đội ngũ SGO tư vấn cấu hình và lộ trình triển khai phù hợp với doanh nghiệp.
            </p>
          </div>
          <Link
            href="/lien-he"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Nhận tư vấn
            <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true"></i>
          </Link>
        </div>
      </section>
      {consultationRequest && (
        <ConsultationModal
          service={consultationRequest.service}
          provisionCode={consultationRequest.provisionCode}
          onClose={() => setConsultationRequest(null)}
        />
      )}
    </>
  );
}
