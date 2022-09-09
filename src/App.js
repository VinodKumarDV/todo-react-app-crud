import React, { useState, useEffect } from 'react'
import View from './components/View';
// import AddForm from './components/AddForm';
// import EditForm from './components/EditForm';

// getting the values of local storage
const getData = () => {
  const data = localStorage.getItem('prod');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}

export const App = () => {

  const [prods, setProds] = useState(getData());
  const [isEditing, setIsEditing] = useState(false);
  const [currentProd, setCurrentProd] = useState({});

  const [food, setfood] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState('');

  const handleAddFoodSubmit = (e) => {
    e.preventDefault();

    let Prod = {
      id: new Date(),
      food,
      price,
      available
    }
    console.log(prods)
    setProds([...prods, Prod]);
    setfood('');
    setPrice('');
    setAvailable('');
  }

  const handleEditClick = (prod) => {
    setIsEditing(true)
    setCurrentProd({...prod})
  }

  const handleEditFoodSubmit = (e) => {
    e.preventDefault();

    handleUpdatedProd(currentProd.id, currentProd)
  }
  
  const handleEditInputChange = (name) => (e) => {
    setCurrentProd((currentProd)=> ({
      ...currentProd,
      [name]: e.target.value
    }))
    console.log(currentProd)
  }

  const handleUpdatedProd = (id, currentProd) => {
    const updatedItem = prods.map((prod) => {
      return prod.id === id ? currentProd : prod;
    });
    setIsEditing(false)
    // setCurrentProd(updatedItem)
    setProds(updatedItem)
  }

  const deleteFood = (price) => {
    const filteredProds = prods.filter((element, index) => {
      return element.price !== price
    })
    setProds(filteredProds);
  }

  useEffect(() => {
    localStorage.setItem('prods', JSON.stringify(prods));
  }, [prods])

  return (
    <div className='wrapper'>
      <h1>FoodList App</h1>
      <div className='main'>
        {isEditing ? (
          // <EditForm handleEditFoodSubmit={handleEditFoodSubmit} handleEditInputChange={handleEditInputChange} currentProd={currentProd} setIsEditing={setIsEditing} />
          
        <div className='form-container h-100'>
          <h4 className='text-center'>Edit Food</h4>
          <form autoComplete="off" className='form-group'
              onSubmit={handleEditFoodSubmit}>
            <h6>Title</h6>
              <input type="text" className='form-control' required value={currentProd.food}
                onChange={handleEditInputChange('food')}></input>
            <br></br>
            <h6>price</h6>
              <input type="text" className='form-control' required value={currentProd.price}
                onChange={handleEditInputChange('price')}></input>
            <br></br>
            <h6>available</h6>
              <input type="text" className='form-control' required value={currentProd.available}
                onChange={handleEditInputChange('available')}></input>
            <br></br>
            <button type="submit" className='btn btn-success mb-2 btn-md'>
              UPDATE
              </button>
            <button onClick={() => setIsEditing(false)}  className='btn btn-success btn-md'>
              CANCLE
            </button>
          </form>
        </div>
        
        ) : (
          // <AddForm food={food} setfood={setfood} price={price} setPrice={setPrice} available={available} setAvailable={setAvailable} handleAddFoodSubmit={handleAddFoodSubmit} />
        
            <div className='form-container h-100'>
            <h4 className='text-center'>Add New Food</h4>
          <form autoComplete="off" className='form-group'
            onSubmit={handleAddFoodSubmit}>
            <h6>Title</h6>
            <input type="text" className='form-control' required
              onChange={(e) => setfood(e.target.value)} value={food}></input>
            <br></br>
            <h6>price</h6>
            <input type="text" className='form-control' required
              onChange={(e) => setAvailable(e.target.value)} value={available}></input>
            <br></br>
            <h6>available</h6>
            <input type="text" className='form-control' required
              onChange={(e) => setPrice(e.target.value)} value={price}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
          </div>
        )}


        <div className='view-container'>
          {prods.length > 0 && <>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th className='text-center' >Title</th>
                    <th className='text-center' >Price</th>
                    <th className='text-center' >Avail</th>
                    <th className='text-center' >Update</th>
                    <th className='text-center' >Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View handleEditClick={handleEditClick} prods={prods} deleteFood={deleteFood} />
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
              onClick={() => setProds([])}>Remove All</button>
          </>}
          {prods.length < 1 && <div>No food are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
