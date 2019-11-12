import url from 'url';

import { lesson, student, teacher } from '../models';

import { buildParams, getData } from '../lib/tools';

export default (router) => {
  router
    .get('root', '/', async (ctx) => {
      const { query } = url.parse(ctx.request.url, true);
      if (Object.keys(query).length) {
        const params = buildParams(query);
        ctx.body = await lesson.scope(...params).findAll().map(item => getData(item));
      } else ctx.body = await lesson.findAll().map(item => getData(item));
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
