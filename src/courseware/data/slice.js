/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const LOADING = 'loading';
export const LOADED = 'loaded';
export const FAILED = 'failed';
export const DENIED = 'denied';

const slice = createSlice({
  name: 'courseware',
  initialState: {
    courseId: null,
    courseStatus: LOADING,
    sequenceId: null,
    sequenceMightBeUnit: false,
    sequenceStatus: LOADING,
    courseOutline: {},
    courseOutlineSidebarSettings: {},
    discussionsSidebarSettings: {},
    courseOutlineStatus: LOADING,
  },
  reducers: {
    fetchCourseRequest: (state, { payload }) => {
      state.courseId = payload.courseId;
      state.courseStatus = LOADING;
    },
    fetchCourseSuccess: (state, { payload }) => {
      state.courseId = payload.courseId;
      state.courseStatus = LOADED;
    },
    fetchCourseFailure: (state, { payload }) => {
      state.courseId = payload.courseId;
      state.courseStatus = FAILED;
    },
    fetchCourseDenied: (state, { payload }) => {
      state.courseId = payload.courseId;
      state.courseStatus = DENIED;
    },
    fetchSequenceRequest: (state, { payload }) => {
      state.sequenceId = payload.sequenceId;
      state.sequenceStatus = LOADING;
      state.sequenceMightBeUnit = false;
    },
    fetchSequenceSuccess: (state, { payload }) => {
      state.sequenceId = payload.sequenceId;
      state.sequenceStatus = LOADED;
      state.sequenceMightBeUnit = false;
    },
    fetchSequenceFailure: (state, { payload }) => {
      state.sequenceId = payload.sequenceId;
      state.sequenceStatus = FAILED;
      state.sequenceMightBeUnit = payload.sequenceMightBeUnit || false;
    },
    fetchCourseOutlineRequest: (state) => {
      state.courseOutline = {};
      state.courseOutlineStatus = LOADING;
    },
    fetchCourseOutlineSuccess: (state, { payload }) => {
      state.courseOutline = payload.courseOutline;
      state.courseOutlineStatus = LOADED;
    },
    fetchCourseOutlineFailure: (state) => {
      state.courseOutline = {};
      state.courseOutlineStatus = FAILED;
    },
    setCoursewareOutlineSidebarSettings: (state, { payload }) => {
      state.courseOutlineSidebarSettings = payload;
    },
    setDiscussionsSidebarSettings: (state, { payload }) => {
      state.discussionsSidebarSettings = payload;
    },
    updateCourseOutlineCompletion: (state, { payload }) => {
      const { sequenceId, unitId, isComplete: isUnitComplete } = payload;
      if (!isUnitComplete) {
        return state;
      }

      state.courseOutline.units[unitId].complete = true;

      const sequenceUnits = state.courseOutline.sequences[sequenceId].unitIds;
      const isAllUnitsAreComplete = sequenceUnits.every((id) => state.courseOutline.units[id].complete);

      if (isAllUnitsAreComplete) {
        state.courseOutline.sequences[sequenceId].complete = true;
      }

      const sectionId = Object.keys(state.courseOutline.sections)
        .find(section => state.courseOutline.sections[section].sequenceIds.includes(sequenceId));
      const sectionSequences = state.courseOutline.sections[sectionId].sequenceIds;
      const isAllSequencesAreComplete = sectionSequences.every((id) => state.courseOutline.sequences[id].complete);

      if (isAllSequencesAreComplete) {
        state.courseOutline.sections[sectionId].complete = true;
      }

      return state;
    },
  },
});

export const {
  fetchCourseRequest,
  fetchCourseSuccess,
  fetchCourseFailure,
  fetchCourseDenied,
  fetchSequenceRequest,
  fetchSequenceSuccess,
  fetchSequenceFailure,
  fetchCourseRecommendationsRequest,
  fetchCourseRecommendationsSuccess,
  fetchCourseRecommendationsFailure,
  fetchCourseOutlineRequest,
  fetchCourseOutlineSuccess,
  fetchCourseOutlineFailure,
  setCoursewareOutlineSidebarSettings,
  updateCourseOutlineCompletion,
  setDiscussionsSidebarSettings,
} = slice.actions;

export const {
  reducer,
} = slice;
