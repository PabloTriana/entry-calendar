import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/AppLayout';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import { EditAppointmentPage } from './features/appointments/pages/EditAppointmentPage';
import { NewAppointmentPage } from './features/appointments/pages/NewAppointmentPage';
import { AppointmentTypesPage } from './features/appointmentTypes/pages/AppointmentTypesPage';
import { EditAppointmentTypePage } from './features/appointmentTypes/pages/EditAppointmentTypePage';
import { NewAppointmentTypePage } from './features/appointmentTypes/pages/NewAppointmentTypePage';
import { CalendarPage } from './features/calendar/pages/CalendarPage';
import { HomePage } from './features/home/pages/HomePage';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'appointments/new', element: <NewAppointmentPage /> },
      { path: 'appointments/:id/edit', element: <EditAppointmentPage /> },
      { path: 'appointment-types', element: <AppointmentTypesPage /> },
      { path: 'appointment-types/new', element: <NewAppointmentTypePage /> },
      { path: 'appointment-types/:id/edit', element: <EditAppointmentTypePage /> },
      { path: '*', element: <RouteErrorBoundary /> },
    ],
  },
]);
