import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // router オブジェクト取得
  const router = useRouter();
  // statusには、authenticated, unauthenticated, loadingのいずれかが格納される
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [router, status])

  if (status === 'unauthenticated') return null;

  return <>{children}</>
}

export default ProtectedRoute;
