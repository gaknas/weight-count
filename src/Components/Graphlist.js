import React, {useState} from 'react'
import Graph from './Graph'
export default function GraphList(props) {

    const [name, setName] = useState("")
    const [counter, setCounter] = useState(0)

    function submitHandler(event) {
        event.preventDefault()
        if (name.trim()) {
            props.add_graph(name)
            setCounter(counter + 1)
        }
    }

    return (
        <>
            {props.data.length > 0 ? <ul>
            { props.data.map(graph => {
                return <li key={ props.data.indexOf(graph) }><a href={ "/graph/" + props.data.indexOf(graph) } ><h1>{graph.name}</h1></a><button onClick={() => {props.delete(props.data.indexOf(graph))}}>Удалить</button></li>
            }) }
            </ul>: <h1>NO DATA</h1>}
            <form onSubmit={submitHandler} style={{display: "flex", justifyContent: "center"}}>
                <input placeholder="Название" onChange={event => {setName(event.target.value)}} />
                <button type="submit">Добавить</button>
            </form>
        </>
    )
}