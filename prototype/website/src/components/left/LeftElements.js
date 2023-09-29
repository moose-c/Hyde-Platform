import Selection from './Selection'
import TimeseriesForm from './TimeseriesForm'

export default function LeftElements({ selection }) {
    return (
        <>
            <div>
                <Selection selection={selection} />
                <button onClick={displayFom}>
                    Display Timeseries Plotting Form
                </button>
            </div>
            <div>
                <TimeseriesForm />
                <label>
                    <input type="checkbox" id="x-axis" />
                    <span id="relative">Relative</span>/<span id="absolute">Absolute</span>{" "}
                    scale
                </label>
                <br />
                <label>
                    <input type="checkbox" id="combine" />
                    <span id="seperate">Seperate</span>/<span id="combined">Combined</span>{" "}
                    figure
                </label>
            </div>
        </>
    )
}

function displayFom() {

}