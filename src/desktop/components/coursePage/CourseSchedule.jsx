import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

/* Child Components */
import TabContainer from '../common/TabContainer';

/* Styled Components */
import { ScheduleTable, CourseScheduleWrapper } from './styles/CourseSchedule';

const mapStateToProps = state => ({});

const CourseScheduleInner = term => {
  return <ScheduleTable>{term}</ScheduleTable>;
};

const termsOffered = ['Spring 2019', 'Fall 2019', 'Winter 2020'];

const CourseSchedule = () => {
  const tabList = termsOffered.map(value => {
    return { title: value, render: () => CourseScheduleInner(value) };
  });

  return (
    <CourseScheduleWrapper>
      <TabContainer initialSelectedTab={0} tabList={tabList} />
    </CourseScheduleWrapper>
  );
};

export default connect(mapStateToProps)(CourseSchedule);
