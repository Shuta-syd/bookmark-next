import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <div className='bg-gray-900'>
        <div className='container mx-auto flex max-w-4xl items-center px-2 py-7'>
          <div className='mx-auto flex w-full flex-wrap items-center'>
            <div className='flex w-full justify-center font-extrabold text-white '>
              <Link
                href='/'
                className='text-2xl text-gray-900 uo-underline hover:text-gray-900 hover:no-underline '
              >
                🚀 &nbsp; <span className='text-gray-200'>BUKUMA</span>
              </Link>
            </div>
            <div className='flex w-full content-center justify-between pt-2'>
              <ul className='list-reset flex flex-1 items-center justify-center'>
                <li className='py-1 px-4 text-white no-underline'>
                  <Link href='/articles'>Articles</Link>
                </li>
                {status !== 'loading' && session && (
                  // statusがloadingではない、つまり認証情報の取得が完了している
                  // かつ、認証されている場合に、下記を表示
                  <>
                    <li className='py-1 px-4 text-white no-underline'>
                      <Link href='/mypage'>MyPage</Link>
                    </li>
                    <li className='py-1 px-4 text-white no-underline'>
                      <button onClick={() => signOut()}>
                        <a>Log out</a>
                      </button>
                    </li>
                  </>
                )}
                {status !== 'loading' && !session && (
                  // statusがloadingではない、つまり認証情報の取得が完了している
                  // かつ、認証されていない場合に、下記を表示
                  <li className='py-1 px-4 text-white no-underline'>
                    <button onClick={() => signIn()}>
                      <a>Log in</a>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
