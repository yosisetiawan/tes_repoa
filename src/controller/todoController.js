let todo  = []
const db = require('../config/database')

exports.index = (req, res) => {
    db.query('SELECT * FROM tbl_todos', (err, rows) => {
        if(err) throw err

        return res.send({
            message: 'Berhasil',
            item: rows
        })
    })
}

exports.create = (req, res) => {
    const number = Math.random().toFixed(10).substr(2, 9)
    const { waktu, task } = req.body

    db.query(`INSERT INTO tbl_todos VALUES ('${number}', '${task}')`, (err) => {
        if(err) throw err
    })

    return res.send({
        message: 'Berhasil Simpan', 
        task: task
    })
}

exports.show = (req, res) => {
    const params = req.params.id

    const find = todo.find(item => {
        return item.id == params
    })

    return res.send({
        message: 'Berhasil Ditemukan',
        find
    })
}

exports.destroy = (req, res) => {
    const { id } = req.params

    const index = todo.findIndex(item => item.id == id)
    
    if(index != -1){
        todo.splice(index, 1)
        return res.send({
            message: 'Data Ini Berhasil dihapus',
            id
        })
    }else{
        return res.send({
            message: 'ID tidak ditemukan'
        })
    }
}

exports.update = (req, res) => {
    const { id } = req.params
    const { waktu, task } = req.body

    const index = todo.findIndex(item => item.id == id)

    if(index != -1){

        // Single Update
        // todo[index].waktu = waktu
        let item = todo[index]

        // Multi Update
        const data = {
            ...item,
            waktu,
            task
        }

        todo[index] = data
        
        const todoItem = todo[index]
        return res.send({
            message: 'Berhasil UPDATE',
            todoItem
        })
    }else{
        return res.send({
            message: 'ID yang tidak ditemukan'
        })
    }
}