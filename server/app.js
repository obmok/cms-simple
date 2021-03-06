const Koa = require('koa');
const mongoose = require('./libs/mongoose');
const User = require('./models/User');
const Router = require('koa-router');
const pick = require('lodash/pick');

const app = new Koa();

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/04-templates').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);

const usersRouter = new Router({
  prefix: '/users'
});

async function loadById(ctx, next) {
  const id = ctx.params.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(404);
  }

  ctx.userById = await User.findById(id);

  if (!ctx.userById) {
    ctx.throw(404, 'user with this id not found');
  }

  await next();
}

async function handleValidationError(ctx, next) {
  try {
    await next();
  } catch (err) {
    if (err.name == "ValidationError") {
      ctx.status = 400;

      let errors = {};

      for (let field in err.errors) {
        errors[field] = err.errors[field].message;
      }

      ctx.body = {
        errors: errors
      };

    } else {
      throw err;
    }
  }
}

usersRouter
  .post('/', handleValidationError, async function(ctx) {
    const user = await User.create(pick(ctx.request.body, User.publicFields));
    ctx.body = user.serialize();
  })
  .put('/:userId', loadById, handleValidationError, async function(ctx) {
    Object.assign(ctx.userById, pick(ctx.request.body, User.publicFields));
    await ctx.userById.save();
    ctx.body = ctx.userById.serialize();
  })
  .get('/:userId', loadById, async function(ctx) {
    ctx.body = ctx.userById.serialize();
  })
  .delete('/:userId', loadById, async function(ctx) {
    await ctx.userById.remove();
    ctx.body = 'ok';
  })
  .get('/', async function(ctx) {
    const users = await User.find({});
    ctx.body = users.map(user => user.serialize());
  });

app.use(usersRouter.routes());

module.exports = app;
