import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ProtectedRoute from './ProtectedRoute';

//ログイン済みのユーザーにのみ表示するページ → マイページ, 記事詳細ページ
const authRoutes = ['/mypage', '/articles/[id]'];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const router = useRouter();

  // 認証情報取得中にはコンポーネントを表示しない
  if (session.status === 'loading') return null;

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        // もしも、現在のページがログインを要求するページの場合
        // ログイン状況に応じて、ページを表示する or ログイン画面にリダイレクトさせるかを判定
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        // 現在のページが、ログインを要求しないページの場合
        // 認証情報を調べる必要はないので、そのままページを表示
        children
      )}
    </>
  );
};

export default AuthWrapper;
