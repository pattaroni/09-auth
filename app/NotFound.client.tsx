"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function NotFoundClient() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return null;
}

export default NotFoundClient;
