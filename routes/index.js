import root from './root';
/* import users from './users';
import sessions from './sessions';
import tasks from './root';
import tags from './tags';
import comments from './comments';
import errors from './errors'; */

const controllers = [root];

export default (router, container) => controllers.forEach(f => f(router, container));
