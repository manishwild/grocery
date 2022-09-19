import React from 'react'
import List from './List'
import Alert from './Alert'

const  getLocalStorage = () => {
  let  list =  localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

const App = () => {
  const [name, setName] = React.useState('')
  const [list, setList] = React.useState(getLocalStorage)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editId, setEditId] = React.useState(null)
  const [alert, setAlert] = React.useState({ show: true, msg: '', type: '' })

  const submitHandler = (e) => {
    e.preventDefault()
    if (!name) {
      // setAlert({ show: true, msg: 'Please Enter Value', type: 'danger' }) // another method
      showAlert(true, 'danger', 'Please Enter Value')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Edited')
    } else {
      showAlert(true, 'success', 'Succefully Added To  The  List')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'All List Removed')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item is Removed')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specifItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specifItem.title)
  }
React.useEffect(() => {
  localStorage.setItem('list',JSON.stringify(list))
}, [list]);
  return (
    <section className="section-center">
      <form action="" className="grocery-form" onSubmit={submitHandler}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery List</h3>
        <div className="form-control">
          <input
            type="text"
            name=""
            id=""
            className="grocery"
            placeholder="eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
