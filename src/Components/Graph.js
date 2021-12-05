import React, {useState} from 'react'
import {XYPlot, LineSeries, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
export default function Graph(props) {
    const [date, setDate] = useState('')
    const [weight, setWeight] = useState('')
    const [counter, setCounter] = useState(0)
    const index = props.meta.match.params.index
    function submitHandler(event) {
        event.preventDefault()
        if (date.trim() && weight.trim()) {
            props.add_data(date, weight, index)
            setCounter(counter + 1)
        }
    }
    return (
        <>
            {props.data[index].grph.length > 0 ? <div className="graph">
            <XYPlot
                xType="ordinal"
                width={1000}
                height={500}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Дата" />
                <YAxis title={props.data[index].name} />
                <LineSeries
                    curve={'curveMonotoneX'}
                    data={props.data[index].grph}
                />
            </XYPlot>
            </div> : <h1>NO DATA</h1>}
            <form onSubmit={submitHandler} style={{display: "flex", justifyContent: "center"}}>
                <input placeholder="Дата" onChange={event => {setDate(event.target.value)}} />
                <input placeholder={props.data[index].name} onChange={event => {setWeight(event.target.value)}} />
                <button type="submit">Добавить</button>
            </form>
        </>
    )
}
//<h1>{props.data[props.data.length - 1].name}</h1>