import Sequelize from 'sequelize';
// import { teacher } from '../models';

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
    // count = (student.visit === true) ? count += 1 : count;
    return count;
  }, 0);
  // const teacherNames = await teachers.map(teacher => teacher.name);
  // const teacherIds = await teachers.map(teacher => teacher.id);
  // const studentNames = await students.map(student => student.name);
  // const studentIds = await students.map(student => student.id);
  /* const visitCount = await lesson.count({
    include: [
      { model: lessonStudent },
    ],
    where: {
      visit: true,
    },
  }); */

  const data = {
    id: lesson.dataValues.id,
    date: lesson.dataValues.date,
    title: lesson.dataValues.title,
    status: lesson.dataValues.status,
    visitCount,
    students,
    teachers,
    // teacher: teacher.name,
    // student: student.name,
    // teacherIds,
    // studentIds,
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
  const filteredLessons1 = lesson.scope('teachers', { teacherIds }).findAll();
  const filteredLessons = await lesson.findAll({ where });
  // console.log(filteredLessons);
  const lessonsPromise = filteredLessons1.map(item => getData(item));
  // console.log(lessonsPromise);
  const lessons = await Promise.all(lessonsPromise);
  // console.log(lessons);
  return lessons;
  // teacherIds.length === 0 ? lessons : filterByTeacherIds(lessons, teacherIds);
};


/*
export const isExist = entity => !(entity === null || entity.createdAt === undefined);

export const checkAuth = async (ctx, next) => {
  if (ctx.state.isSignedIn()) {
    await next();
    return;
  }
  ctx.flash.set('Please Log In For Access to This page');
  ctx.redirect('/sessions/new');
}; */
