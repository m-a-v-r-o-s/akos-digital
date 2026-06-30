"use client";

import { useRouter } from "next/navigation";

export default function CrmLogout() {
  const router = useRouter();
  const logout = async () => {
    try {
      await fetch("/api/crm/session", { method: "DELETE" });
    } catch {
      /* ignore */
    }
    router.push("/");
  };
  return (
    <button
      onClick={logout}
      className="font-mono text-xs tracking-widest uppercase text-stone hover:text-gold-light transition-colors"
    >
      Lock ✦
    </button>
  );
}
