import url from 'url';
import _ from 'lodash';
/* import rollbar from 'rollbar';
import buildFormObj from '../lib/formObjectBuilder'; */

import { lesson, student, teacher } from '../models';

import { filterLessons } from '../lib/tools';

const filterQuery = (query) => {
  // console.log(query);
  // console.log(Object.keys(query));
  console.log(Object.keys(query).filter(key => query[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: query[key] }), {}));
  return Object.keys(query).filter(key => query[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: query[key] }), {});
};

const parseTeacherIds = str => str.toLowerCase()
  .split(',')
  .map(s => s.replace(/\s+/g, ''))
  .filter(v => v !== '')
  .map(n => Number(n));

const scopes = [
  {
    check: key => key === 'teacherIds',
    func: (key, value) => ({ method: [key, parseTeacherIds(value)] }),
  },
  {
    check: key => key === 'studentsCount',
    func: (key, value) => ({ method: [key, value] }),
  },
];

const getScopes = (key, value) => _.find(scopes, ({ check }) => check(key, value));

const buildParams = (query) => {
  console.log(query);
  const filteredQuery = filterQuery(query);
  console.log(filteredQuery);
  return Object.keys(filteredQuery).map((key) => {
    const { func } = getScopes(key, filteredQuery[key]);
    console.log(func);
    const result = func(key, filteredQuery[key], query);
    console.log(result);
    return result;
  });
};


export default (router) => {
  router
    .get('root', '/', async (ctx) => {
      const { query } = url.parse(ctx.request.url, true);
      if (Object.keys(query).length) {
        const params = buildParams(query);
        const lessons = lesson.scope(...params).findAll();
        console.log(JSON.stringify(lessons));
        ctx.body = lessons;
      }
      /*  
      // console.log(Object.entries(query));
      const filteredLessons = await filterLessons(lesson, query);
      // console.log(less);
      const lessons = await lesson.findAll(); // filterTasks(lesson, query);
      const students = await student.findAll();
      const teachers = await teacher.findAll(); */
    });

  /*  .post('lessons#create', '/lessons', async (ctx) => {
      const { request: { body: form } } = ctx;
      const { teacherIds } = ctx.session;
      const users = await User.findAll();
      const tags = form.form.Tags.split(' ');
      const task = await Task.build(form.form);
      try {
        await task.save();
        tags.map(tag => Tag.findOne({ where: { name: tag } })
          .then(async result => (result ? task.addTag(result)
            : task.createTag({ name: tag }))));
        ctx.flash.set('Task Successully Added.');
        ctx.redirect(router.url('tasks#list'));
      } catch (e) {
        rollbar.handleError(e);
        ctx.render('tasks/new', { f: buildFormObj(task, e), users });
      }
    }); */
};
