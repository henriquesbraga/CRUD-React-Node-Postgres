const getTableData = (request, response, db) => {
    db.select('*').from('people')
    .then(items => {
        if(items.length){
            response.json(items);
        }
        else{
            response.json({dataExists: 'false'})
        }
    })
    .catch(err => response.status(400).json({dbError: 'db error'}));

}

const postTableData = (req, res, db) => {
    const { first, last, email, phone, location, hobby } = req.body
    const added = new Date()
    db('people').insert({first, last, email, phone, location, hobby, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

const putTableData = (req, res, db) => {
    const { id, first, last, email, phone, location, hobby } = req.body; //recebe a rquisição
    db('people').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  
const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('people').where({id}).del()
    .then(() => {
    res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
}