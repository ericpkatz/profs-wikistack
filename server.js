const { db, Page, User, Tag } = require("./models");
const app = require("./app");

const PORT = 3000;

const init = async () => {
  try {
    // Reference: https://sequelize.org/master/manual/model-basics.html#model-synchronization
    // `.sync()` creates the table in the database if it doesn't exist (and does nothing if it already exists)
    // We can do this two ways:
    // 1. call `.sync()` on each individual Sequelize model (see commented out code below), or
    // await Page.sync();
    // await User.sync();

    // 2. call `.sync()` on the entire Sequelize instance (e.g. `db`) since our models are defined on it (i.e. `db.define(...)`)
    await db.sync({ force: true});
    const [prof, ji] = await Promise.all([
      User.create({ name: 'prof', email: 'prof@gmail.com'}),
      User.create({ name: 'ji', email: 'ji@gmail.com'}),
    ]);

    const [journal, draw, cook] = await Promise.all([
      Page.create({ title: 'Journaling', content: 'some content', authorId: ji.id}),
      Page.create({ title: 'Drawing', content: 'some content', authorId: ji.id}),
      Page.create({ title: 'Cooking', content: 'some content', authorId: prof.id})
    ]);

    const [food, fun] = await Promise.all([
      Tag.create({ name: 'food'}),
      Tag.create({ name: 'fun'}),
    ]);

    await journal.addTags([ fun ]);
    await cook.addTags([ fun, food ]);

    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error)
  }
};

init();
