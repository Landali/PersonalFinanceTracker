import '../Styles/table.css'


const UpdateIconModal = ({ budget, name, description, date, total, incomeId, optionalComponent }) => {
    const NewComponent= optionalComponent;
    // ..
    return <NewComponent 
    budget={budget} 
    name={name} 
    description={description} 
    date={date} 
    total={total} 
    incomeId={incomeId} />
 }

const Table = ({ headers, body, handleUpdate, handleDelete, updateForm, budget }) => {

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
                            <td>{<UpdateIconModal
                            budget={budget} 
                            name={el.name} 
                            description={el.description} 
                            date={el.date} 
                            total={el.total} 
                            incomeId={el.id}
                            optionalComponent={updateForm}/> }</td>
                            <td><i id='delete-table-icon' className="bi bi-trash3" onClick={() => handleDelete(el)}></i></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    )
}

export default Table