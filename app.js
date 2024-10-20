const express = require('express')
const app = express()
const port = 3000

let todos = []

app.use(express.static('public'))
app.use(express.json())

app.get('/todos', (req, res) => {
	res.json(todos)
})

app.post('/add', (req, res) => {
	const task = req.body.task
	if (task) {
		let newTask = {
			id: todos.length, 
			task: task,
		}
		todos.push(newTask)
		res.status(200).json({ success: true, newTask })
	} else {
		res.status(400).json({ success: false, message: 'task not found' })
	}
})

app.delete('/delete/:id', (req, res) => {
	const id = parseInt(req.params.id) 
	if (isNaN(id)) {
		return res.status(400).json({ success: false, message: 'Invalid ID' })
	}
	todos = todos.filter(todo => todo.id !== id) 
	res.status(200).json({ success: true })
})

app.put('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const updatedTask = req.body.task;
  if(!updatedTask || isNaN(id)){
    res.status(400).json({success:false, message:'Task not found'})
  }
  
    let changedTodo = todos.find(todos => todos.id === id)
    if(!changedTodo){
      res.status(400).json({success:false, message:'Task not found'})
    }

    changedTodo.task = updatedTask
    res.status(200).json({success:true, updatedTask:changedTodo})
  
})




app.listen(port, () => {
	console.log(`server listening on port ${port}`)
})
