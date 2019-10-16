// import lessonStudent from '../models/lessonStudent';

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
  if (query[key].split(' ')[0] !== 'All' && query[key] !== '') {
    // console.log({ where: { ...acc.where, [key]: Number(query[key]) } });
    return { where: { ...acc.where, [key]: Number(query[key]) } };
  }
  return acc;
}, { where: {} });


export const filterLessons = async (lesson, query = {}) => {
  const { where } = getParams(query);
  console.log(getParams(query));
  const filteredLessons = await lesson.findAll({ where });
  // console.log(filteredLessons);
  const lessonsPromise = filteredLessons.map(item => getData(item));
  // console.log(lessonsPromise);
  const lessons = await Promise.all(lessonsPromise);
  // console.log(lessons);
  return lessons;
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
