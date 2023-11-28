'use client'
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import { GetAdmin } from './GetAdmin';

const CheckPermissions = (Component: React.ComponentType<any>) => {
    return function CheckPermissions(props: any) {
      const { data: session, status } = useSession();
      const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
        const checkAdminStatus = async () => {
          try {
            const adminEmail = await GetAdmin();
            setIsAdmin(adminEmail === session?.user?.email);
            setLoading(false);
            console.log('admin:', adminEmail);
          } catch (error) {
            console.error('Error checking admin status:', error);
            setIsAdmin(false); // Set to false in case of an error
            setLoading(false);
          }
        };
    
        if (status === 'authenticated' && session) {
          checkAdminStatus();
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }, [session, status]);

      useEffect(() => {
        console.log('isAdmin:', isAdmin);
        console.log('email:', session?.user?.email);
  
        if (!loading && !isAdmin) {
          redirect('/');
        }
      }, [isAdmin, loading, session]);
  
      if (!isAdmin) {
        console.log('Redirecting to /');
        return null;
      }
  
      console.log('Rendering component');
      return <Component {...props} />;
    };
  };
  

export default CheckPermissions;


