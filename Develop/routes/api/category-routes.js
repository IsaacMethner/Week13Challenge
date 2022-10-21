const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  
  Category.findAll ({
attributes: ['id','category_name'],
  included: [
    {
      model: Product, 
      attributes: ['id', 'name', 'price', 'stock', 'category_id']
    }
  ]
}) // be sure to include its associated Products
  .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({message: 'No category data found'})
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne ({
    where: {
      id: req.params.id
    },
    attributes: ['id','category_name'],
    included: [
      {
        model: Product, 
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  // be sure to include its associated Products
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(500).json({ alert: "no category with given id was found"});
      return;
    }
    res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.bodu, {
    where: {
      id: re.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData[0]) {
      res.status(404).json({ 
      alert:'No Category with given id was found'
      });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.delete({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ alert: 'No Category with given id was found'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
