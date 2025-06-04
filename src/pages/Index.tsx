
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import { Layout } from '@/components/Layout';
import { EmployeeDashboard } from '@/components/employee/EmployeeDashboard';
import { BenefitCatalog } from '@/components/employee/BenefitCatalog';
import { HRDashboard } from '@/components/hr/HRDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  const isEmployee = user.role === 'employee';

  return (
    <Layout>
      {isEmployee ? <EmployeeDashboard /> : <HRDashboard />}
    </Layout>
  );
};

export default Index;
