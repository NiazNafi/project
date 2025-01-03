import { useState } from 'react';
import { Layout } from '../components/admin/Layout';
import { CourseList } from '../components/admin/CourseList';
import { ComplaintBox } from '../components/admin/ComplaintBox';

type AdminView = 'courses' | 'complaints';

export function AdminDashboard() {
  const [currentView, setCurrentView] = useState<AdminView>('courses');

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'courses' && <CourseList />}
      {currentView === 'complaints' && <ComplaintBox />}
    </Layout>
  );
}