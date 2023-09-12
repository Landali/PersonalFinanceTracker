import '../Styles/table.css'




const Table = ({ headers, body, handleUpdate, handleDelete }) => {

    return (
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    {headers.map((el) => {
                        return (<th scope="col">{el.name}</th>)
                    })}
                </tr>
            </thead>
            <tbody>
                {body.map((el) => {
                    return (
                        <tr>
                            <th scope="row">{el.name}</th>
                            <td>{el.description}</td>
                            <td>{el.total}</td>
                            <td>{el.date}</td>
                            <td><i id='update-table-icon' className="bi bi-pencil-square" onClick={() => handleUpdate(el)}></i></td>
                            <td><i id='delete-table-icon' className="bi bi-trash3" onClick={()=>handleDelete(el)}></i></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    )
}

export default Table