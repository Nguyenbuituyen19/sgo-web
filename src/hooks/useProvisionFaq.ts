import { useState, useEffect } from "react";
import { getProvisions, getProvisionDetail, ProvisionDetailFaq, ProvisionItem } from "@/shared/provision";

export interface FaqItem {
  id?: string;
  q: string;
  a: string;
}

export function useProvisionFaq(provisionCode: string) {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchFaqs() {
      setLoading(true);
      setError(null);

      try {
        const provisionsRes = await getProvisions();
        let targetProvisionId: string | undefined;

        if (provisionsRes.success && provisionsRes.data) {
          const matched = provisionsRes.data.find(
            (p: ProvisionItem) => p.code?.toLowerCase() === provisionCode.toLowerCase()
          );
          if (matched) {
            targetProvisionId = matched.id;
          }
        }

        let fetchedFaqs: FaqItem[] = [];

        if (targetProvisionId) {
          const detailRes = await getProvisionDetail(targetProvisionId);
          if (detailRes.success && detailRes.data?.faqs) {
            fetchedFaqs = detailRes.data.faqs
              .filter((f: ProvisionDetailFaq) => !f.status || f.status === "ACTIVE")
              .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
              .map((f: ProvisionDetailFaq) => ({
                id: f.id,
                q: f.question,
                a: f.answer,
              }));
          }
        }

        if (isMounted) {
          setFaqs(fetchedFaqs);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Không thể tải danh sách FAQ");
          setLoading(false);
        }
      }
    }

    if (provisionCode) {
      fetchFaqs();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [provisionCode]);

  return { faqs, loading, error };
}
