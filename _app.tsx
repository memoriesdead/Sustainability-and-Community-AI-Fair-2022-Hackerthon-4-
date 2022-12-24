import { AppType } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { trpc } from '../utils/trpc';
import IndexPage from '../pages/index';
import './api/trpc/Post.css';

import '../styles/globals.css';

const MyApp: AppType<{ session: Session | null }> = ({
pageProps: { session, ...pageProps },
}) => {
return (
<SessionProvider session={session}>
<IndexPage {...pageProps} />
</SessionProvider>
);
};

export default trpc.withTRPC(MyApp);