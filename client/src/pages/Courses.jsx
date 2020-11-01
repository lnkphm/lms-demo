import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import CourseList from '../components/CourseList';
import CourseOverview from '../components/CourseOverview';
import CourseUsers from '../components/CourseUsers';
import CourseGrades from '../components/CourseGrades';
import CourseExams from '../components/CourseExams';

export default function Course(props) {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={CourseList} />
      <Route exact path={`${path}/:courseId`} component={CourseOverview} />
      <Route exact path={`${path}/:courseId/exams`} component={CourseExams} />
      <Route exact path={`${path}/:courseId/users`} component={CourseUsers} />
      <Route exact path={`${path}/:courseId/grades`} component={CourseGrades} />
    </Switch>
  );
}