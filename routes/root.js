import url from 'url';
/* import rollbar from 'rollbar';
import buildFormObj from '../lib/formObjectBuilder'; */

import { lesson, student, teacher } from '../models';

// import { getData, checkAuth, filterTasks } from '../lib/tools';

export default (router) => {
  router
    .get('root', '/', async (ctx) => {
      // const { query } = url.parse(ctx.request.url, true);
      const lessons = await lesson.findAll(); // filterTasks(lesson, query);
      const students = await student.findAll();
      const teachers = await teacher.findAll();
      ctx.body = [lessons, students, teachers];
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
    })

    .patch('tasks#update', '/tasks/:id', checkAuth, async (ctx) => {
      const { statusId, taskId } = ctx.request.body;
      const task = await Task.findByPk(Number(taskId));
      task.setStatus(Number(statusId));
      ctx.redirect(router.url('tasks#view', taskId));
    })

    .delete('tasks#delete', '/tasks/:id', checkAuth, async (ctx) => {
      const taskId = Number(ctx.params.id);
      Task.destroy({
        where: { id: taskId },
      });
      ctx.flash.set('Task Succesfully Deleted.');
      ctx.redirect(router.url('tasks#list'));
    }); */
};
