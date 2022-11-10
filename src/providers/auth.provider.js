import React, { createContext, useContext, useEffect, useState } from 'react';
import Storage from "../utils/useStorage";

const AuthContext = createContext({});

const { getItem, setItem, removeItem } = Storage();

function AuthProvider({ children }) {
    const [user, setProviderUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // removeItem('qUsers')
        // removeItem('qUser')
        loadStorageData();
    }, []);

    async function loadStorageData() {
        try {
            setLoading(true);
            const _user = await getItem('qUser');

            setProviderUser(_user);
        } catch (error) {
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }

    const checkEmail = async (email) => {
        const _users = await getItem('qUsers') || [];

        const findUser = _users?.find(user =>
            (user.email === email)
        );

        if (!findUser?.email) {
            return false;
        }

        return true;
    }


    const setUser = async _user => {
        const _users = await getItem('qUsers') || [];

        const findUser = _users?.find(user =>
            (user.email === _user.email) && (user.password === _user.password)
        );


        if (!findUser?.email) {
            return false;
        }
        return true;
    };

    const setUsers = async _user => {
        const _users = await getItem('qUsers') || [];
        const findUser = _users?.find(user => user.email === _user.email);

        if (findUser?.email) {
            return false;
        }
        const _newUsers = [..._users, _user];

        const response = await setItem('qUsers', _newUsers);
        return response;
    };

    const removeUser = async () => {
        await removeItem('qUser');
        setProviderUser(null);

        return true;
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            setUsers,
            loading,
            checkEmail,
            removeUser,
            setProviderUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { useAuth, AuthProvider };
