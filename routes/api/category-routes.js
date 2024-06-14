const router = require('express').Router();
const { Category, Product } = require('../../models');

// find all categories
router.get('/', async (req, res) => {
  try {
    const allCategoryData = await Category.findAll({
      include: { 
        model: Product 
      }
    });
    const categories = allCategoryData.map((category) => category.get({ plain: true }));
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne(
      {
        where: { id: req.params.id },
        include: { model: Product },
      }
    );
    const result = categoryData.get({ plain: true });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const createNewCategory = await Category.create(req.body);
    res.json(createNewCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create new category' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(
      req.body,
      { where: { id: req.params.id } }
    );
    res.json(updateCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy(
      { where: { id: req.params.id } }
    );
    res.json(deleteCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
