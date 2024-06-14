const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTagData = await Tag.findAll({
      include: { all: true }
    });
    const tags = allTagData.map((tag) => tag.get({ plain: true }));
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findOne(
      {
        where: { id: req.params.id },
        include: { 
          model: Product
        },
      }
    );
    const result = tagData.get({ plain: true });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createNewTag = await Tag.create(req.body);
    res.json(createNewTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create new tag' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(
      req.body,
      { where: { id: req.params.id }}
    );
    res.json(updateTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy(
      { where: { id: req.params.id }}
    );
    res.json(deleteTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
