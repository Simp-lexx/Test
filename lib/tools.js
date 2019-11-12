import Sequelize from 'sequelize';
import _ from 'lodash';

export const getData = async (lesson) => {
  const teachers = await lesson.getTeachers().reduce((acc, teacher) => {
    const teacherObj = { id: teacher.id, name: teacher.name };
    acc.push(teacherObj);
    return acc;
  }, []);
  const students = await lesson.getStudents().reduce((acc, student) => {
    const studentObj = { id: student.id, name: student.name, visit: student.lesson_student.visit };
    acc.push(studentObj);
    return acc;
  }, []);
  const visitCount = await students.reduce((acc, student) => {
    let count = acc;
    if (student.visit === true) {
      count += 1;
    }
    return count;
  }, 0);

  const data = {
    id: lesson.dataValues.id,
    date: lesson.dataValues.date,
    title: lesson.dataValues.title,
    status: lesson.dataValues.status,
    visitCount,
    students,
    teachers,
  };
  return data;
};

const getParams = query => Object.keys(query).reduce((acc, key) => {
  const { Op } = Sequelize;
  // console.log(Object.keys(query));
  if (query[key].split(' ')[0] !== 'All' && query[key] !== '') {
    if (key === 'date' && query[key].split(',').length > 1) {
      const datesRange = query[key].split(',');
      return { where: { ...acc.where, [key]: { [Op.between]: datesRange } } };
    }
    /* if (key === 'teacherIds') {
      // console.log(key, query[key].split(','));
      const teacherIds = query[key].split(','); // Input arrar ID of teachers
      // console.log(typeof teacherIds);
      const arrayTeachIds = [];
      teacherIds.forEach((id) => {
        arrayTeachIds.push(Number(id));
      });
      console.log({ [key]: query[key].split(',') });
      // console.log({ where: { ...acc.where, teachers: [{ id: { [Op.in]: arrayTeachIds } }] } });
      return { [key]: query[key].split(',') };
    } */
    // console.log(acc.where);
    // console.log({ where: { ...acc.where, [key]: (query[key]) } });
    // console.log(Object.entries(acc.where));
    return { where: { ...acc.where, [key]: (query[key]) } };
  }
  return acc;
}, { where: {} });

const filterByTeacherIds = (lessons, teacherIds) => lessons.teachers.filter(teacher => teacherIds.split(',').indexOf(teacher.id) > -1);

export const filterLessons = async (lesson, query = {}) => {
  const { where } = getParams(query);
  console.log(query);
  console.log(where);
  const teacherIdsString = Object.values(where).toString();
  console.log(teacherIdsString);
  const teacherIds = teacherIdsString.split(',');
  console.log(teacherIds);
  /*  if (Object.keys(where).includes('teacherIds')) {
  } */
  // console.log(query);
  // console.log(Object.entries(query));
  // const filteredLessons1 = lesson.scope('teacher_id', { teacherIds }).findAll();
  const filteredLessons = await lesson.findAll({ where });
  // console.log(filteredLessons);
  const lessonsPromise = filteredLessons.map(item => getData(item)).then(result => console.log(result));
  // console.log(lessonsPromise);
  const lessons = await Promise.all(lessonsPromise);
  // console.log(lessons);
  return lessons;
  // teacherIds.length === 0 ? lessons : filterByTeacherIds(lessons, teacherIds);
};

const filterQuery = query => Object.keys(query).filter(key => query[key] !== '')
  .reduce((acc, key) => ({ ...acc, [key]: query[key] }), {});

const parseParamsToArrNumbers = str => str.toLowerCase()
  .split(',')
  .map(s => s.replace(/\s+/g, ''))
  .filter(v => v !== '')
  .map(n => Number(n));

const parseParamsToArrDates = (str) => {
  const dateRange = [str, str];
  if (str.split(',').length > 1) {
    return str.split(',')
      .map(s => s.replace(/\s+/g, ''))
      .filter(v => v !== '')
      .map(d => d);
  }
  return dateRange;
};

const scopes = [
  {
    check: key => key === 'studentsCount',
    func: (key, value) => ({ method: [key, parseParamsToArrNumbers(value)] }),
  },
  {
    check: key => key === 'status',
    func: (key, value) => ({ method: [key, value] }),
  },
  {
    check: key => key === 'date',
    func: (key, value) => ({ method: [key, parseParamsToArrDates(value)] }),
  },
  {
    check: key => key === 'teacherIds',
    func: (key, value) => ({ method: [key, parseParamsToArrNumbers(value)] }),
  },
  {
    check: key => key === 'studentsCount',
    func: (key, value) => ({ method: [key, value] }),
  },
];

const getScopes = (key, value) => _.find(scopes, ({ check }) => check(key, value));

export const buildParams = (query) => {
  const filteredQuery = filterQuery(query);
  console.log(filteredQuery);
  return Object.keys(filteredQuery).map((key) => {
    const { func } = getScopes(key, filteredQuery[key]);
    console.log(Object.entries(func));
    const result = func(key, filteredQuery[key], query);
    console.log(result);
    return result;
  });
};
