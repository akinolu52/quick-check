import { useAuth } from '../providers';

import { SplashScreen } from '../screens';
import { AuthNavigation } from './AuthNavigation';
import { MainNavigation } from './MainNavigation';

function AppNavigation() {
    const { user, loading } = useAuth();

    if (loading) return <SplashScreen />;

    return (
        <>
            {user?.email ? <MainNavigation /> : <AuthNavigation />}
        </>
    );
}

export { AppNavigation };
