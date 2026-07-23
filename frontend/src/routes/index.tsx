import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { DashboardLayout, MainLayout } from '@/layouts';
import { Spinner } from '@/components/ui';
import { ROUTES } from '@/constants';

const HomePage = lazy(() => import('@/pages/HomePage'));
const DashboardsPage = lazy(() => import('@/pages/DashboardsPage'));
const ChartsPage = lazy(() => import('@/pages/ChartsPage'));

const FamilyPlanningPage = lazy(() => import('@/pages/dashboards/FamilyPlanningPage'));
const MaternalHealthPage = lazy(() => import('@/pages/dashboards/MaternalHealthPage'));
const NeonatalHealthPage = lazy(() => import('@/pages/dashboards/NeonatalHealthPage'));

const NCDPage = lazy(() => import('@/pages/dashboards/NCDPage'));
const MalariaPage = lazy(() => import('@/pages/dashboards/MalariaPage'));
const HIVPage = lazy(() => import('@/pages/dashboards/HIVPage'));
const TBPage = lazy(() => import('@/pages/dashboards/TBPage'));

const HealthEquityPage = lazy(() => import('@/pages/dashboards/HealthEquityPage'));
const HealthWorkforcePage = lazy(() => import('@/pages/dashboards/HealthWorkforcePage'));
const HealthFinancingPage = lazy(() => import('@/pages/dashboards/HealthFinancingPage'));
const SupplyLogisticsPage = lazy(() => import('@/pages/dashboards/SupplyLogisticsPage'));
const BloodDonationPage = lazy(() => import('@/pages/dashboards/BloodDonationPage'));
const PHEMPage = lazy(() => import('@/pages/dashboards/PHEMPage'));
const InfrastructurePage = lazy(() => import('@/pages/dashboards/InfrastructurePage'));
const PHCPage = lazy(() => import('@/pages/dashboards/PHCPage'));
const DigitalSystemsPage = lazy(() => import('@/pages/dashboards/DigitalSystemsPage'));
const ServicesDeliveryPage = lazy(() => import('@/pages/dashboards/ServicesDeliveryPage'));

const PrivacyPage = lazy(() => import('@/pages/legal/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/legal/TermsPage'));
const DataGovernancePage = lazy(() => import('@/pages/legal/DataGovernancePage'));

const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <Spinner size="xl" color="primary" />
  </div>
);

const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

// Create router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout showSidebar={false} showFooter={false} />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.CHARTS,
        element: (
          <SuspenseWrapper>
            <ChartsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.PRIVACY,
        element: (
          <SuspenseWrapper>
            <PrivacyPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.TERMS,
        element: (
          <SuspenseWrapper>
            <TermsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: ROUTES.DATA_GOVERNANCE,
        element: (
          <SuspenseWrapper>
            <DataGovernancePage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: '/dashboards',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <DashboardsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'services-delivery',
        element: (
          <SuspenseWrapper>
            <ServicesDeliveryPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'family-planning',
        element: (
          <SuspenseWrapper>
            <FamilyPlanningPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'maternal-health',
        element: (
          <SuspenseWrapper>
            <MaternalHealthPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'neonatal-health',
        element: (
          <SuspenseWrapper>
            <NeonatalHealthPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'ncd',
        element: (
          <SuspenseWrapper>
            <NCDPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'malaria',
        element: (
          <SuspenseWrapper>
            <MalariaPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'hiv',
        element: (
          <SuspenseWrapper>
            <HIVPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'tb',
        element: (
          <SuspenseWrapper>
            <TBPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'health-equity',
        element: (
          <SuspenseWrapper>
            <HealthEquityPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'health-workforce',
        element: (
          <SuspenseWrapper>
            <HealthWorkforcePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'health-financing',
        element: (
          <SuspenseWrapper>
            <HealthFinancingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'supply-logistics',
        element: (
          <SuspenseWrapper>
            <SupplyLogisticsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'blood-donation',
        element: (
          <SuspenseWrapper>
            <BloodDonationPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'phem',
        element: (
          <SuspenseWrapper>
            <PHEMPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'infrastructure',
        element: (
          <SuspenseWrapper>
            <InfrastructurePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'phc',
        element: (
          <SuspenseWrapper>
            <PHCPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'digital-systems',
        element: (
          <SuspenseWrapper>
            <DigitalSystemsPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: '/404',
    element: (
      <SuspenseWrapper>
        <NotFoundPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
