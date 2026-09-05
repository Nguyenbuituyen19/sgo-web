'use client';

import { useEffect } from 'react';

export default function ScrollRestorationFix() {
  useEffect(() => {
    // 1. Tắt cơ chế tự nhớ vị trí cuộn của trình duyệt
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Cuộn ngay về đỉnh trang khi load/reload
    window.scrollTo(0, 0);
  }, []);

  return null;
}